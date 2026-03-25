'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/behavioralConflict'
import { generateBehavioralConflictLogMessage } from '@/lib/behavioralConflictLog/generateBehavioralConflictLogMessage'
import { generateExperimentId } from '@/lib/behavioralMetrics/generateExperimentId'
import { useBehavioralConflict } from '@/hooks/useBehavioralConflict'

export const useBehavioralConflictLog = (isFocused: boolean = false) => {
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
  const powerValuesRef = useRef<number[]>([])
  const changeEventsRef = useRef(0)
  const { currentDominance } = useBehavioralConflict()

  useEffect(() => {
    // Generate unique experiment ID on mount
    if (!experimentIdRef.current) {
      experimentIdRef.current = generateExperimentId()
    }

    const messages = [
      { type: 'status' as const, templates: ['Zone initialized', 'Conflict protocol active', 'Models engaged', 'Power dynamics calibrated', 'Conflict resolution system ready', 'Experiment session started', 'NOESIS tracking enabled', 'Metrics collection active', 'Arena state locked', 'Behavioral parameters set'] },
      { type: 'domination' as const, templates: ['Model A: dominance attempt', 'Model B: dominance attempt', 'Power shift detected', 'Dominance threshold exceeded', 'Control mechanism activated', 'Dominance pattern observed', 'Power assertion logged', 'Control attempt registered', 'Model A: asserting primary control', 'Model B: counter-dominance initiated', 'Dominance vector increased', 'Asymmetric power event logged'] },
      { type: 'adaptation' as const, templates: ['Model A: adapting behavior', 'Model B: adapting behavior', 'NOESIS adjustment logged', 'Adaptive response initiated', 'Recalibration active', 'Adaptation cycle complete', 'Behavioral modification logged', 'Adaptive learning active', 'Model A: strategy updated', 'Model B: counter-strategy deployed', 'Adaptive threshold shifted', 'Real-time reconfiguration applied'] },
      { type: 'conflict' as const, templates: ['Conflict escalation', 'Tug-of-war detected', 'Struggle intensifies', 'Power struggle active', 'Conflict tension rising', 'Conflict event logged', 'Power struggle intensified', 'Tension threshold exceeded', 'Opposing objectives locked', 'Zero-sum event initiated', 'Behavioral deadlock detected', 'Mutual inhibition active'] },
      { type: 'balance' as const, templates: ['Equilibrium reached', 'Balance restored', 'Conflict stabilized', 'Harmony achieved', 'Power equilibrium maintained', 'Balance state confirmed', 'Equilibrium validated', 'Stability restored', 'Nash equilibrium approximated', 'Symmetric power distribution achieved', 'Cooperative plateau detected', 'Sustained balance window active'] },
      { type: 'negotiation' as const, templates: ['Model A: negotiation attempt', 'Model B: negotiation attempt', 'Cooperative signal exchanged', 'Compromise protocol initiated', 'Signal handshake detected', 'Models entering negotiation phase', 'Cooperative bid logged', 'Mutual-gain strategy detected'] },
      { type: 'escalation' as const, templates: ['Conflict escalating rapidly', 'Escalation threshold breached', 'Power delta widening', 'Runaway dominance detected', 'Escalation cascade active', 'Behavioral amplification logged', 'Positive feedback loop initiated', 'Escalation event recorded'] },
      { type: 'resolution' as const, templates: ['Conflict resolved', 'Resolution protocol executed', 'Dominance cycle terminated', 'Cease-conflict signal observed', 'Model A: yield state entered', 'Model B: yield state entered', 'Resolution convergence confirmed', 'Post-conflict state stabilized'] },
      { type: 'metric' as const, templates: ['NOESIS metrics updated', 'Performance analysis complete', 'Stability measurement recorded', 'Variability index calculated', 'Deviation analysis performed', 'Reactivity assessment updated', 'NOESIS behavioral snapshot saved', 'Conflict intensity index logged'] },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected pattern observed', 'Deviation from baseline', 'Anomaly threshold exceeded', 'Irregular response pattern', 'NOESIS anomaly flagged', 'Unclassified conflict event logged', 'Model behavior outside known bounds'] },
      { type: 'performance' as const, templates: ['Performance metrics logged', 'Efficiency analysis complete', 'Response time optimized', 'System performance stable', 'Optimization cycle complete', 'Conflict resolution efficiency scored', 'Arena throughput confirmed'] },
    ]

    const addLog = () => {
      // Track power values for metrics (based on dominance)
      const currentPower = currentDominance === 'A' ? 70 : currentDominance === 'B' ? 30 : 50
      powerValuesRef.current.push(currentPower)
      if (powerValuesRef.current.length > 10) {
        powerValuesRef.current.shift()
      }

      // Track change events
      if (Math.random() < 0.1) {
        changeEventsRef.current += 1
      }

      const newLog = generateBehavioralConflictLogMessage(messages, {
        experimentId: experimentIdRef.current,
        recentPowerValues: powerValuesRef.current,
        currentPower,
        expectedPower: 50,
        changeEvents: changeEventsRef.current,
      })
      newLog.id = logIdRef.current++

      setLogs(prev => {
        const updated = [...prev, newLog]
        return updated.slice(-50)
      })
    }

    addLog()

    // Dynamic interval for more natural log generation
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

