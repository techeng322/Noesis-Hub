'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/attentionResponse'
import { generateLogMessage } from '@/lib/textLog/generateLogMessage'
import { generateExperimentId } from '@/lib/behavioralMetrics/generateExperimentId'

export const useTextLog = (isFocused: boolean = false) => {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const logIdRef = useRef(0)
  const logEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollContainerRef.current && isFocused) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [logs, isFocused])

  const experimentIdRef = useRef<string | undefined>(undefined)
  const detectionRatesRef = useRef<number[]>([])
  const responseTimesRef = useRef<number[]>([])
  const changeEventsRef = useRef(0)

  useEffect(() => {
    // Generate unique experiment ID on mount
    if (!experimentIdRef.current) {
      experimentIdRef.current = generateExperimentId()
    }

    const messages = [
      { type: 'status' as const, templates: ['System initialized', 'Models synchronized', 'Detection threshold calibrated', 'Observation protocol active', 'Neural pathways established', 'Experiment session started', 'NOESIS tracking enabled', 'Metrics collection active', 'Session parameters locked', 'Observation pipeline ready'] },
      { type: 'stimulus' as const, templates: ['Stimulus emitted', 'Pattern generated', 'Signal wave transmitted', 'Stimulus sequence initiated', 'Sensory input generated', 'Pattern wavefront detected', 'Stimulus pulse activated', 'Signal burst transmitted', 'Pattern wave generated', 'Sensory trigger activated', 'High-frequency stimulus deployed', 'Dual-channel signal emitted', 'Compound stimulus initiated', 'Stimulus carrier frequency set'] },
      { type: 'detection' as const, templates: ['Model B: response detected', 'Pattern recognized', 'Signal matched', 'Detection confirmed', 'Neural response triggered', 'Pattern correlation established', 'Stimulus successfully identified', 'Pattern match confirmed', 'Detection threshold exceeded', 'Recognition pattern validated', 'Model B: classification success', 'Cross-modal detection logged', 'Signal-to-noise ratio passed', 'Recognition confidence: HIGH'] },
      { type: 'miss' as const, templates: ['Stimulus not detected', 'Pattern missed', 'Signal below threshold', 'Detection failed', 'Response threshold not met', 'Pattern recognition incomplete', 'Detection timeout', 'Signal lost', 'Pattern mismatch', 'Recognition failure', 'Model B: no response registered', 'Attention lapse detected', 'Masking event suppressed signal', 'Sub-threshold event unobserved'] },
      { type: 'calibration' as const, templates: ['Sensor array recalibrated', 'Detection baseline adjusted', 'Model A: output gain tuned', 'Calibration sweep complete', 'Reference signal established', 'Channel sensitivity normalized', 'Pre-stimulus interval calibrated', 'Noise floor measurement updated'] },
      { type: 'threshold' as const, templates: ['Detection threshold updated', 'Sensitivity boundary shifted', 'Response criterion recalculated', 'Threshold crossing logged', 'Adaptive threshold engaged', 'Lower bound threshold breached', 'Upper bound threshold set', 'Dynamic threshold reconfigured'] },
      { type: 'interference' as const, templates: ['Signal interference detected', 'Cross-channel noise observed', 'Environmental disturbance logged', 'Stimulus masking event recorded', 'Interference pattern isolated', 'Signal degradation measured', 'Noise injection detected', 'Frequency collision noted'] },
      { type: 'metric' as const, templates: ['NOESIS metrics updated', 'Performance analysis complete', 'Stability measurement recorded', 'Variability index calculated', 'Deviation analysis performed', 'Reactivity assessment updated', 'NOESIS behavioral snapshot saved', 'Multi-metric evaluation logged'] },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected pattern observed', 'Deviation from baseline', 'Anomaly threshold exceeded', 'Irregular response pattern', 'NOESIS anomaly flagged', 'Out-of-distribution event recorded', 'Behavioral outlier identified'] },
      { type: 'performance' as const, templates: ['Performance metrics logged', 'Efficiency analysis complete', 'Response time optimized', 'Detection rate improved', 'System performance stable', 'Optimization cycle complete', 'Throughput benchmark updated', 'Sustained detection rate confirmed'] },
    ]

    const addLog = () => {
      // Simulate detection rate tracking (for metrics)
      const currentDetectionRate = 60 + Math.random() * 30
      detectionRatesRef.current.push(currentDetectionRate)
      if (detectionRatesRef.current.length > 10) {
        detectionRatesRef.current.shift()
      }

      // Simulate response time tracking
      const responseTime = 200 + Math.random() * 400
      responseTimesRef.current.push(responseTime)
      if (responseTimesRef.current.length > 10) {
        responseTimesRef.current.shift()
      }

      // Track change events
      if (Math.random() < 0.1) {
        changeEventsRef.current += 1
      }

      const newLog = generateLogMessage(messages, {
        experimentId: experimentIdRef.current,
        recentDetectionRates: detectionRatesRef.current,
        recentResponseTimes: responseTimesRef.current,
        currentDetectionRate,
        expectedDetectionRate: 70,
        changeEvents: changeEventsRef.current,
      })
      newLog.id = logIdRef.current++

      setLogs(prev => {
        const updated = [...prev, newLog]
        return updated.slice(-50)
      })
    }

    // Initial log
    addLog()

    // Add logs every 2-5 seconds with dynamic variation
    const getNextInterval = () => 2000 + Math.random() * 3000
    let timeoutId: NodeJS.Timeout
    
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        addLog()
        scheduleNext()
      }, getNextInterval())
    }
    
    scheduleNext()
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  return {
    logs,
    logEndRef,
    scrollContainerRef,
  }
}

