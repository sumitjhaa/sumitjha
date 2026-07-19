'use client'

import React, { useRef, useEffect, useCallback } from 'react'

export interface WindChimeConfig {
    chainCount: number
    segmentsMin: number
    segmentsMax: number
    constraintIter: number
    segStringRatio: number
    marginX: number
    anchorY: number
    gravity: number
    damping: number
    airDrag: number
    catenarySag: number
    pendulumSegments: number
    pendulumStiffness: number
    collisionRadius: number
    collisionForce: number
    elasticBounce: number
    boundaryBounce: number
    mouseR: number
    mouseDragR: number
    mouseDragStr: number
    mouseVelR: number
    mouseVelStr: number
    flickR: number
    flickStr: number
    flickSpeedMin: number
    wakeRadius: number
    wakeStr: number
    clumpRadius: number
    clumpStr: number
    gridSize: number
    sparkMax: number
    enableCollision: boolean
    enableBounds: boolean
    dashWidth: number
    dashGap: number
    lineOpacity: number
    anchorSwayAmp: number
    anchorSwayFreq: number
    windBaseAmp: number
    windGustAmp: number
    windTurbAmp: number
    windBurstAmp: number
    windBurstThr: number
    stictionThr: number
    scrollDecay: number
    scrollMax: number
    scrollMult: number
    scrollKey: number
    scrollRand: number
    activateStagger: number
    colors: string[]
    collisionSoundVol: number
    noteFrequencies: number[]
    buckets: number
}

export interface WindChimeProps extends Partial<WindChimeConfig> {
    width?: string | number
    height?: string
    minHeight?: string
    className?: string
    style?: React.CSSProperties
}

const DEFAULTS: WindChimeConfig = {
    chainCount: 150,
    segmentsMin: 4,
    segmentsMax: 20,
    constraintIter: 4,
    segStringRatio: 0.9,
    marginX: 1,
    anchorY: 0,
    gravity: 0.6,
    damping: 0.982,
    airDrag: 0.992,
    catenarySag: 0.05,
    pendulumSegments: 4,
    pendulumStiffness: 0.015,
    collisionRadius: 10,
    collisionForce: 0.8,
    elasticBounce: 0.3,
    boundaryBounce: 0.4,
    mouseR: 10,
    mouseDragR: 110,
    mouseDragStr: 1.4,
    mouseVelR: 65,
    mouseVelStr: 2.0,
    flickR: 75,
    flickStr: 2.5,
    flickSpeedMin: 2,
    wakeRadius: 70,
    wakeStr: 0.12,
    clumpRadius: 14,
    clumpStr: 0.04,
    gridSize: 25,
    sparkMax: 15,
    enableCollision: true,
    enableBounds: true,
    dashWidth: 3,
    dashGap: 0.3,
    lineOpacity: 0.5,
    anchorSwayAmp: 1.5,
    anchorSwayFreq: 0.0007,
    windBaseAmp: 0.08,
    windGustAmp: 0.06,
    windTurbAmp: 0.035,
    windBurstAmp: 0.2,
    windBurstThr: 0.6,
    stictionThr: 0.08,
    scrollDecay: 0.88,
    scrollMax: 4.0,
    scrollMult: 0.007,
    scrollKey: 2.0,
    scrollRand: 3.5,
    activateStagger: 6,
    colors: ['#b4bed2'],
    collisionSoundVol: 0.04,
    noteFrequencies: [523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319],
    buckets: 10,
}

const { PI } = Math
const PI2 = PI * 2
const { sqrt, sin, cos, atan2, abs, floor, max, min } = Math
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v)

interface Point {
    x: number
    y: number
    px: number
    py: number
    pinned: boolean
    mass: number
}

interface Chime {
    pts: Point[]
    ax: number
    ay: number
    bax: number
    segLen: number
    segCount: number
    color: string
    dashLen: number
    active: boolean
    delay: number
    aPhase: number
    cDamp: number
    cGrav: number
    wPhase: number
    wF1: number
    wF2: number
    nOff: number
    lastSoundT: number
}

interface Spark {
    life: number
    x: number
    y: number
    vx: number
    vy: number
    sz: number
}

interface WindChimeState {
    chimes: Chime[]
    allPoints: Point[]
    sparks: Spark[]
    grid: Point[][]
    gridW: number
    gridH: number
    stageW: number
    stageH: number
    raf: number | null
    lastT: number
    startT: number
    frameCount: number
    mx: number
    my: number
    pmx: number
    pmy: number
    scroll: number
    hist: { x: number; y: number; t: number }[]
    lastTap: number
    keys: Record<string, number>
    rect: DOMRect | null
    mouseActive: boolean
    mouseActiveT: number
    audioCtx: AudioContext | null
    audioReady: boolean
}

const WindChime: React.FC<WindChimeProps> = (props) => {
    const cfg: WindChimeConfig = { ...DEFAULTS, ...props }
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const stateRef = useRef<WindChimeState | null>(null)

    const initState = useCallback(
        (): WindChimeState => ({
            chimes: [],
            allPoints: [],
            sparks: [],
            grid: [],
            gridW: 0,
            gridH: 0,
            stageW: 0,
            stageH: 0,
            raf: null,
            lastT: 0,
            startT: 0,
            frameCount: 0,
            mx: -1000,
            my: -1000,
            pmx: -1000,
            pmy: -1000,
            scroll: 0,
            hist: [],
            lastTap: 0,
            keys: {},
            rect: null,
            mouseActive: false,
            mouseActiveT: 0,
            audioCtx: null,
            audioReady: false,
        }),
        [],
    )

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        const dpr = window.devicePixelRatio || 1
        const S = initState()
        stateRef.current = S

        const round2 = (v: number) => (v + 0.5) | 0
        const perfScale = min(1, (navigator.hardwareConcurrency || 4) / 8)
        const chainCount = round2(cfg.chainCount * max(0.35, perfScale))
        const constraintIter = round2(cfg.constraintIter * max(0.5, perfScale))

        const initAudio = () => {
            if (S.audioReady) return
            try {
                S.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
                S.audioReady = true
            } catch (_) {}
        }

        const playChimeSound = (intensity: number) => {
            if (!S.audioCtx || !S.audioReady) return
            if (S.audioCtx.state === 'suspended') S.audioCtx.resume()
            const now = S.audioCtx.currentTime
            const vol = min(intensity * cfg.collisionSoundVol, 0.06)
            const freq = cfg.noteFrequencies[(Math.random() * cfg.noteFrequencies.length) | 0]
            const osc = S.audioCtx.createOscillator()
            const gain = S.audioCtx.createGain()
            const filter = S.audioCtx.createBiquadFilter()
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(freq, now)
            filter.type = 'lowpass'
            filter.frequency.value = freq * 2
            gain.gain.setValueAtTime(vol, now)
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
            osc.connect(filter)
            filter.connect(gain)
            gain.connect(S.audioCtx.destination)
            osc.start(now)
            osc.stop(now + 0.7)
        }

        const resizeCanvas = () => {
            S.stageW = canvas.clientWidth
            S.stageH = canvas.clientHeight || 600
            canvas.width = S.stageW * dpr
            canvas.height = S.stageH * dpr
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        const gridInit = () => {
            const gs = cfg.gridSize
            const extraRows = Math.ceil(Math.abs(cfg.anchorY) / gs)
            S.gridW = ((S.stageW / gs) | 0) + 2
            S.gridH = ((S.stageH / gs) | 0) + 2 + extraRows
            const total = S.gridW * S.gridH
            S.grid = []
            for (let i = 0; i < total; i++) S.grid.push([])
        }

        const gridClear = () => {
            for (let i = 0; i < S.grid.length; i++) S.grid[i].length = 0
        }

        const gridBuild = () => {
            gridClear()
            const { allPoints: pts, gridW: gw, gridH: gh } = S
            const gs = cfg.gridSize
            const extraRows = Math.ceil(Math.abs(cfg.anchorY) / gs)
            for (let i = 0; i < pts.length; i++) {
                const p = pts[i]
                const gy = ((p.y / gs) | 0) + extraRows
                const gx = (p.x / gs) | 0
                if (gy < 0 || gy >= gh || gx < 0 || gx >= gw) continue
                const k = gy * gw + gx
                if (S.grid[k]) S.grid[k].push(p)
            }
        }

        const addSpark = (x: number, y: number) => {
            if (S.sparks.length >= cfg.sparkMax) return
            S.sparks.push({
                life: 1,
                x,
                y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 1.5,
                sz: 1.5 + Math.random() * 2.5,
            })
        }

        const computeWind = (c: Chime, t: number) => {
            const wp = c.wPhase
            const w1 = sin(t * c.wF1 * 3 + wp) * cfg.windBaseAmp
            const w2 = sin(t * c.wF2 * 2.5 + wp * 1.7) * cfg.windGustAmp
            const t1 = sin(t * 0.003 + c.nOff) * cfg.windTurbAmp
            const calm = max(0, sin(t * 0.0005 + wp) - 0.6)
            return {
                x: (w1 + w2 + t1 + S.scroll) * (1 - calm * 0.5),
                y: cos(t * 0.001 + wp * 0.4) * 0.008,
            }
        }

        const physics = (c: Chime, t: number, dt: number) => {
            const { pts } = c
            c.ax = c.bax + sin(t * cfg.anchorSwayFreq + c.aPhase) * cfg.anchorSwayAmp
            const wind = computeWind(c, t)

            let tv = 0
            for (let s = 1; s < pts.length; s++) {
                const p = pts[s]
                tv += abs(p.x - p.px) + abs(p.y - p.py)
            }

            const stic = tv < cfg.stictionThr ? max(0.15, tv / cfg.stictionThr) : 1
            const len = pts.length

            for (let s = 1; s < len; s++) {
                const p = pts[s]
                const vx = (p.x - p.px) * c.cDamp * cfg.airDrag
                const vy = (p.y - p.py) * c.cDamp * cfg.airDrag
                p.px = p.x
                p.py = p.y
                const frac = s / len
                const mf = 1 / (p.mass || 1)
                p.x += vx + wind.x * frac * mf * stic * dt
                p.y += vy + c.cGrav * mf + wind.y * frac * dt

                if (s <= cfg.pendulumSegments) {
                    const ang = atan2(p.x - pts[0].x, p.y - pts[0].y)
                    const restore =
                        cfg.pendulumStiffness * (cfg.pendulumSegments - s + 1) * (1 + frac * 2)
                    p.x += -ang * restore
                    p.y += cos(ang) * restore * 0.3
                }
            }

            pts[0].x = c.ax
            pts[0].y = c.ay
            pts[0].px = c.ax
            pts[0].py = c.ay
        }

        const constraints = (c: Chime) => {
            const { pts } = c
            const ptsLen = pts.length
            for (let it = 0; it < constraintIter; it++) {
                for (let j = 0; j < ptsLen - 1; j++) {
                    const a = pts[j],
                        b = pts[j + 1]
                    const dx = b.x - a.x,
                        dy = b.y - a.y
                    const d = sqrt(dx * dx + dy * dy) || 0.001
                    const df = (d - c.segLen) / d
                    const cat = it === 0 ? sin((j / ptsLen) * PI) * cfg.catenarySag * 0.05 : 0
                    const ox = dx * (df * 0.5 + cat),
                        oy = dy * (df * 0.5 + cat)
                    if (!a.pinned) {
                        a.x += ox
                        a.y += oy
                    }
                    if (!b.pinned) {
                        b.x -= ox
                        b.y -= oy
                    }
                }
                pts[0].x = c.ax
                pts[0].y = c.ay
            }
        }

        const bounds = (c: Chime) => {
            const { pts } = c
            for (let s = 1; s < pts.length; s++) {
                const p = pts[s]
                if (p.x < 4) {
                    p.x = 4
                    p.px = p.x + abs(p.x - p.px) * cfg.boundaryBounce
                }
                if (p.x > S.stageW - 4) {
                    p.x = S.stageW - 4
                    p.px = p.x - abs(p.x - p.px) * cfg.boundaryBounce
                }
                if (p.y > S.stageH - 2) {
                    p.y = S.stageH - 2
                    p.py = p.y + abs(p.y - p.py) * 0.5
                }
            }
        }

        const collide = () => {
            gridBuild()
            const { allPoints: pts, gridW: gw, gridH: gh } = S
            const r = cfg.collisionRadius
            const r2 = r * r
            const gs = cfg.gridSize
            const extraRows = Math.ceil(Math.abs(cfg.anchorY) / gs)
            let hadCollision = false

            for (let i = 0; i < pts.length; i++) {
                const pa = pts[i]
                const gx = (pa.x / gs) | 0,
                    gy = ((pa.y / gs) | 0) + extraRows
                for (let dx = -1; dx <= 1; dx++) {
                    const nx = gx + dx
                    if (nx < 0 || nx >= gw) continue
                    for (let dy = -1; dy <= 1; dy++) {
                        const ny = gy + dy
                        if (ny < 0 || ny >= S.gridH) continue
                        const bucket = S.grid[ny * gw + nx]
                        for (let k = 0; k < bucket.length; k++) {
                            const pb = bucket[k]
                            if (pb === pa) continue
                            const bx = pb.x - pa.x,
                                by = pb.y - pa.y
                            const dd = bx * bx + by * by
                            if (dd < r2 && dd > 0.1) {
                                const d = sqrt(dd)
                                const ov = (r - d) / d
                                const ox = bx * ov * 0.5 * cfg.collisionForce
                                const oy = by * ov * 0.5 * cfg.collisionForce
                                pa.x -= ox
                                pa.y -= oy
                                pb.x += ox
                                pb.y += oy
                                const rvx = pa.px - pa.x - (pb.px - pb.x)
                                const rvy = pa.py - pa.y - (pb.py - pb.y)
                                const mA = pa.mass || 1,
                                    mB = pb.mass || 1,
                                    tm = mA + mB
                                pa.px -= rvx * (mB / tm) * cfg.elasticBounce
                                pa.py -= rvy * (mB / tm) * cfg.elasticBounce
                                pb.px += rvx * (mA / tm) * cfg.elasticBounce
                                pb.py += rvy * (mA / tm) * cfg.elasticBounce
                                if (d < r * 0.6) {
                                    addSpark((pa.x + pb.x) * 0.5, (pa.y + pb.y) * 0.5)
                                    if (!hadCollision) {
                                        playChimeSound(abs(rvx) + abs(rvy))
                                        hadCollision = true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        const updateSparks = () => {
            for (let i = S.sparks.length - 1; i >= 0; i--) {
                const sp = S.sparks[i]
                sp.life -= 0.05
                sp.vx *= 0.92
                sp.vy *= 0.92
                sp.vy += 0.06
                sp.x += sp.vx
                sp.y += sp.vy
                if (sp.life <= 0) S.sparks.splice(i, 1)
            }
        }

        const drawSparks = () => {
            if (S.sparks.length === 0) return
            ctx.fillStyle = '#dce6ff'
            ctx.beginPath()
            for (let i = 0; i < S.sparks.length; i++) {
                const sp = S.sparks[i]
                if (sp.life <= 0) continue
                const alpha = min(sp.life, 1)
                const r = sp.sz * alpha * 0.5
                ctx.moveTo(sp.x + r, sp.y)
                ctx.arc(sp.x, sp.y, r, 0, PI2)
            }
            ctx.globalAlpha = 0.85
            ctx.fill()
            ctx.globalAlpha = 1
        }

        const drawChime = (c: Chime) => {
            const { pts } = c
            const n = pts.length

            ctx.lineCap = 'round'
            ctx.lineWidth = cfg.dashWidth
            ctx.strokeStyle = c.color
            ctx.globalAlpha = cfg.lineOpacity

            ctx.beginPath()
            for (let i = 0; i < n - 1; i++) {
                const a = pts[i],
                    bx = pts[i + 1]
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(bx.x, bx.y)
            }
            ctx.stroke()
            ctx.globalAlpha = 1
        }

        const wake = () => {
            const { chimes: ch } = S
            const wakeR2 = cfg.wakeRadius * cfg.wakeRadius
            for (let i = 0; i < ch.length; i++) {
                const ca = ch[i]
                if (!ca.active) continue
                const ba = ca.pts[ca.pts.length - 1]
                const va = abs(ba.x - ba.px) + abs(ba.y - ba.py)
                if (va < 0.3) continue
                for (let j = i + 1; j < ch.length; j++) {
                    const cb = ch[j]
                    if (!cb.active) continue
                    const bb = cb.pts[cb.pts.length - 1]
                    const dx = bb.x - ba.x,
                        dy = bb.y - ba.y
                    const dd = dx * dx + dy * dy
                    if (dd < wakeR2 && dd > 1) {
                        const d = sqrt(dd)
                        const s = va * (1 - d / cfg.wakeRadius) * cfg.wakeStr
                        const nx = dx / d,
                            ny = dy / d
                        const mid = cb.pts[cb.pts.length >> 1]
                        mid.px -= nx * s
                        mid.py -= ny * s
                    }
                }
            }
        }

        const clump = () => {
            const { chimes: ch } = S
            const clumpR2 = cfg.clumpRadius * cfg.clumpRadius
            for (let i = 0; i < ch.length; i++) {
                const ca = ch[i]
                if (!ca.active) continue
                const ba = ca.pts[ca.pts.length - 1]
                for (let j = i + 1; j < ch.length; j++) {
                    const cb = ch[j]
                    if (!cb.active) continue
                    const bb = cb.pts[cb.pts.length - 1]
                    const dx = bb.x - ba.x,
                        dy = bb.y - ba.y
                    const dd = dx * dx + dy * dy
                    if (dd < clumpR2 && dd > 1) {
                        const d = sqrt(dd)
                        const pull = (1 - d / cfg.clumpRadius) * cfg.clumpStr
                        ba.x += dx * pull
                        bb.x -= dx * pull
                    }
                }
            }
        }

        const mouseForces = () => {
            if (S.mx < -500) return
            const { mx, my, pmx, pmy } = S
            const mr2 = cfg.mouseR ** 2,
                dr2 = cfg.mouseDragR ** 2,
                vr2 = cfg.mouseVelR ** 2

            S.chimes.forEach((c) => {
                if (!c.active) return
                for (let s = 1; s < c.pts.length; s++) {
                    const p = c.pts[s]
                    const dx = p.x - mx,
                        dy = p.y - my
                    const dd = dx * dx + dy * dy

                    if (dd < mr2 && dd > 0.1) {
                        const d = sqrt(dd)
                        const ov = min((cfg.mouseR - d) / d, 2)
                        p.x += dx * ov * cfg.collisionForce
                        p.y += dy * ov * cfg.collisionForce
                        const rvx = p.x - p.px - (mx - pmx)
                        const rvy = p.y - p.py - (my - pmy)
                        const nx = dx / d,
                            ny = dy / d
                        const dot = rvx * nx + rvy * ny
                        if (dot < 0) {
                            p.px += nx * dot * cfg.elasticBounce
                            p.py += ny * dot * cfg.elasticBounce
                        }
                        if (d < cfg.mouseR * 0.5) {
                            addSpark((p.x + mx) * 0.5, (p.y + my) * 0.5)
                            const now = performance.now()
                            if (now - c.lastSoundT > 120) {
                                playChimeSound(abs(dot) * 2)
                                c.lastSoundT = now
                            }
                        }
                    }

                    if (dd < dr2 && dd > 1) {
                        const d = sqrt(dd)
                        const inf = (1 - d / cfg.mouseDragR) ** 3
                        const px = (dx / d) * inf * cfg.mouseDragStr
                        const py = (dy / d) * inf * cfg.mouseDragStr
                        p.x += px
                        p.y += py
                        p.px -= px * 0.6
                        p.py -= py * 0.6
                    }

                    if (dd < vr2) {
                        const d = sqrt(dd) || 1
                        const inf = (1 - d / cfg.mouseVelR) ** 2
                        const cvx = clamp((mx - pmx) * 0.35 * inf * cfg.mouseVelStr, -8, 8)
                        const cvy = clamp((my - pmy) * 0.35 * inf * cfg.mouseVelStr, -8, 8)
                        p.px -= cvx
                        p.py -= cvy
                    }
                }
            })
        }

        const layout = () => {
            S.chimes = []
            S.allPoints = []
            S.sparks = []
            resizeCanvas()
            S.rect = canvas.getBoundingClientRect()
            gridInit()

            const usableW = max(S.stageW - cfg.marginX * 2, 40)
            const spacing = chainCount > 1 ? usableW / (chainCount - 1) : 0

            for (let i = 0; i < chainCount; i++) {
                const ax = chainCount > 1 ? cfg.marginX + spacing * i : S.stageW / 2
                const depthRatio = 0.3 + (Math.random() + Math.random()) * 0.325
                const chainLen = S.stageH * cfg.segStringRatio * depthRatio
                const segCount =
                    (cfg.segmentsMin + Math.random() * (cfg.segmentsMax - cfg.segmentsMin)) | 0
                const segLen = chainLen / segCount
                const pts: Point[] = []

                for (let s = 0; s <= segCount; s++) {
                    const cat = sin((s / segCount) * PI) * segCount * cfg.catenarySag
                    const x = ax + (Math.random() - 0.5) * 0.5
                    const y = cfg.anchorY + s * segLen + cat
                    pts.push({
                        x,
                        y,
                        px: x,
                        py: y,
                        pinned: s === 0,
                        mass: 0.8 + (s / segCount) * 0.6,
                    })
                }

                S.chimes.push({
                    pts,
                    ax,
                    ay: cfg.anchorY,
                    bax: ax,
                    segLen,
                    segCount,
                    color: cfg.colors[(Math.random() * cfg.colors.length) | 0],
                    dashLen: (cfg.segmentsMin + Math.random() * 6) | 0,
                    active: false,
                    delay: i * cfg.activateStagger,
                    aPhase: Math.random() * PI2,
                    cDamp: cfg.damping + (Math.random() - 0.5) * 0.008,
                    cGrav: cfg.gravity + (Math.random() - 0.5) * 0.04,
                    wPhase: Math.random() * 1000,
                    wF1: 0.0005 + Math.random() * 0.0005,
                    wF2: 0.0015 + Math.random() * 0.0015,
                    nOff: Math.random() * 1000,
                    lastSoundT: 0,
                })

                for (let s = 1; s < pts.length; s++) S.allPoints.push(pts[s])
            }
        }

        const step = (ts: number) => {
            if (!S.startT) S.startT = ts
            if (!S.lastT) S.lastT = ts
            const dt = min((ts - S.lastT) / 16.667, 3)
            S.lastT = ts
            const t = ts - S.startT
            S.frameCount++

            if (document.hidden) {
                S.raf = requestAnimationFrame(step)
                return
            }

            S.scroll = 0
            const { chimes: ch } = S

            for (let i = 0; i < ch.length; i++) {
                const c = ch[i]
                if (!c.active && t >= c.delay) c.active = true
                if (!c.active) continue
                physics(c, t, dt)
                constraints(c)
                if (cfg.enableBounds) bounds(c)
            }

            if (S.mouseActive) {
                if (ts - S.mouseActiveT > 400) S.mouseActive = false
                wake()
                clump()
            }
            if (cfg.enableCollision && S.frameCount % 2 === 0) collide()
            mouseForces()
            updateSparks()

            ctx.clearRect(0, 0, S.stageW, S.stageH)
            for (let i = 0; i < ch.length; i++) {
                if (!ch[i].active) continue
                drawChime(ch[i])
            }
            drawSparks()
            S.raf = requestAnimationFrame(step)
        }

        const start = () => {
            if (S.raf) cancelAnimationFrame(S.raf)
            S.startT = 0
            S.lastT = 0
            S.frameCount = 0
            layout()
            S.raf = requestAnimationFrame(step)
        }

        const getPos = (e: PointerEvent | Touch) => {
            const r = canvas.getBoundingClientRect()
            S.rect = r
            S.mx = e.clientX - r.left
            S.my = e.clientY - r.top
        }

        const getTouchPos = (e: TouchEvent) => {
            if (e.touches.length) {
                const r = canvas.getBoundingClientRect()
                S.rect = r
                S.mx = e.touches[0].clientX - r.left
                S.my = e.touches[0].clientY - r.top
            }
        }

        const grabStart = () => {
            S.hist = [{ x: S.mx, y: S.my, t: performance.now() }]
        }

        const grabEnd = () => {
            const now = performance.now()
            S.hist.push({ x: S.mx, y: S.my, t: now })
            if (S.hist.length >= 3) {
                const last = S.hist[S.hist.length - 1]
                const first = S.hist[max(0, S.hist.length - 5)]
                const dt = last.t - first.t || 1
                const fvx = ((last.x - first.x) / dt) * 16
                const fvy = ((last.y - first.y) / dt) * 16
                if (sqrt(fvx * fvx + fvy * fvy) > cfg.flickSpeedMin) {
                    S.chimes.forEach((c) => {
                        if (!c.active) return
                        for (let s = 1; s < c.pts.length; s++) {
                            const p = c.pts[s]
                            const d = sqrt((p.x - S.mx) ** 2 + (p.y - S.my) ** 2)
                            if (d < cfg.flickR) {
                                const inf = (1 - d / cfg.flickR) ** 2
                                p.px -= fvx * inf * cfg.flickStr
                                p.py -= fvy * inf * cfg.flickStr
                            }
                        }
                    })
                }
            }
        }

        const tapReset = () => {
            S.chimes.forEach((c) => {
                if (!c.active) return
                c.pts.forEach((p) => {
                    p.px = p.x
                    p.py = p.y
                })
            })
        }

        const onPointerDown = (e: PointerEvent) => {
            initAudio()
            S.pmx = S.mx
            S.pmy = S.my
            getPos(e)
            S.mouseActive = true
            S.mouseActiveT = performance.now()
            if (Date.now() - S.lastTap < 300) tapReset()
            S.lastTap = Date.now()
            grabStart()
        }

        const onPointerMove = (e: PointerEvent) => {
            S.pmx = S.mx
            S.pmy = S.my
            getPos(e)
            S.mouseActive = true
            S.mouseActiveT = performance.now()
        }

        const onPointerUp = () => {
            grabEnd()
            S.mouseActiveT = performance.now()
        }
        const onPointerLeave = () => {
            grabEnd()
            S.mx = -1000
            S.my = -1000
        }

        const onTouchStart = (e: TouchEvent) => {
            initAudio()
            S.pmx = S.mx
            S.pmy = S.my
            getTouchPos(e)
            S.mouseActive = true
            S.mouseActiveT = performance.now()
            if (Date.now() - S.lastTap < 300) tapReset()
            S.lastTap = Date.now()
            grabStart()
        }

        const onTouchMove = (e: TouchEvent) => {
            S.pmx = S.mx
            S.pmy = S.my
            getTouchPos(e)
        }

        const onTouchEnd = () => {
            grabEnd()
            S.mouseActiveT = performance.now()
        }

        const onWheel = (e: WheelEvent) => {}

        const onKeyDown = (e: KeyboardEvent) => {}

        const onKeyUp = (e: KeyboardEvent) => {}

        const onVisibilityChange = () => {
            if (!document.hidden) {
                S.lastT = 0
                S.rect = canvas.getBoundingClientRect()
            }
        }

        const onResize = () => {
            resizeCanvas()
            S.rect = canvas.getBoundingClientRect()
        }

        window.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)
        document.addEventListener('pointerleave', onPointerLeave)
        window.addEventListener('touchstart', onTouchStart, { passive: true })
        window.addEventListener('touchmove', onTouchMove, { passive: true })
        window.addEventListener('touchend', onTouchEnd)
        canvas.addEventListener('wheel', onWheel, { passive: false })
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keyup', onKeyUp)
        document.addEventListener('visibilitychange', onVisibilityChange)

        let resizeObserver: ResizeObserver | null = null
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(onResize)
            resizeObserver.observe(canvas)
        } else {
            window.addEventListener('resize', onResize)
        }

        start()

        return () => {
            if (S.raf) cancelAnimationFrame(S.raf)
            window.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
            document.removeEventListener('pointerleave', onPointerLeave)
            window.removeEventListener('touchstart', onTouchStart)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onTouchEnd)
            canvas.removeEventListener('wheel', onWheel)
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('keyup', onKeyUp)
            document.removeEventListener('visibilitychange', onVisibilityChange)
            if (resizeObserver) resizeObserver.disconnect()
            else window.removeEventListener('resize', onResize)
        }
    }, [cfg, initState])

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: 'block',
                width: props.width ?? '100%',
                height: props.height ?? '90vh',
                minHeight: props.minHeight ?? '600px',
                background: 'var(--surface-1)',
                border: '0.5px solid var(--border)',
                borderRadius: '12px',
                overflow: 'visible',
                ...props.style,
            }}
            className={props.className}
        />
    )
}

export default WindChime
