'use client'

import { useState, useEffect, useRef } from 'react'
import type { LogEntry } from '@/types/patternPrediction'
import { generatePatternPredictionLogMessage } from '@/lib/patternPredictionLog/generatePatternPredictionLogMessage'
import { generateExperimentId } from '@/lib/behavioralMetrics/generateExperimentId'
import { usePatternPrediction } from '@/hooks/usePatternPrediction'

export const usePatternPredictionLog = (isFocused: boolean = false) => {
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
  const accuraciesRef = useRef<number[]>([])
  const responseTimesRef = useRef<number[]>([])
  const changeEventsRef = useRef(0)
  const { accuracy } = usePatternPrediction()

  useEffect(() => {
    // Generate unique experiment ID on mount
    if (!experimentIdRef.current) {
      experimentIdRef.current = generateExperimentId()
    }

    const messages = [
      { type: 'status' as const, templates: ['Room initialized', 'Pattern recognition active', 'Prediction model loaded', 'Cognitive analysis engine ready', 'Pattern database synchronized', 'Experiment session started', 'NOESIS tracking enabled', 'Metrics collection active', 'Sequence generator primed', 'Prediction pipeline armed'] },
      { type: 'sequence' as const, templates: ['Sequence element generated', 'Pattern extended', 'New element added', 'Pattern sequence updated', 'Cognitive pattern expanded', 'Pattern element appended', 'Sequence progression logged', 'Pattern structure updated', 'Recursive sequence element emitted', 'Stochastic element injected', 'Sequence entropy recalculated', 'Non-repeating element inserted'] },
      { type: 'prediction' as const, templates: ['Model B: prediction made', 'Next element predicted', 'Pattern analysis complete', 'Cognitive forecast generated', 'Pattern projection calculated', 'Prediction algorithm executed', 'Forecast generated', 'Pattern inference complete', 'Model B: probabilistic forecast issued', 'Bayesian estimate submitted', 'Sequence continuation predicted', 'Multi-step forecast generated'] },
      { type: 'correct' as const, templates: ['Prediction correct', 'Pattern matched', 'Successful prediction', 'Cognitive accuracy confirmed', 'Pattern recognition validated', 'Prediction validated', 'Pattern match confirmed', 'Accuracy verified', 'Exact match achieved', 'Model B: precision hit logged', 'Zero-deviation prediction confirmed', 'Correct forecast: sequence aligned'] },
      { type: 'incorrect' as const, templates: ['Prediction incorrect', 'Pattern mismatch', 'Prediction failed', 'Cognitive deviation detected', 'Pattern recognition error', 'Prediction error logged', 'Pattern mismatch detected', 'Forecast deviation', 'Model B: off-target prediction', 'Sequence divergence detected', 'Prediction delta exceeds tolerance', 'False-positive forecast noted'] },
      { type: 'adaptation' as const, templates: ['Model adjusted internal parameters', 'Learning rate optimized', 'Pattern recognition improved', 'Cognitive adaptation successful', 'Model performance enhanced', 'Neural weights updated', 'Prediction accuracy increased', 'Adaptive learning cycle complete', 'Parameter drift corrected', 'Error gradient recalculated', 'Adaptive threshold lowered', 'Internal model retrained'] },
      { type: 'hypothesis' as const, templates: ['Model B: hypothesis formed', 'Pattern hypothesis submitted', 'Candidate sequence hypothesis generated', 'Working hypothesis updated', 'Competing hypotheses evaluated', 'Prior hypothesis revised', 'Model B: null hypothesis rejected', 'Hypothesis confidence threshold met'] },
      { type: 'confidence' as const, templates: ['Confidence level updated', 'High-confidence prediction issued', 'Confidence interval narrowed', 'Low-confidence flag raised', 'Prediction certainty recalculated', 'Model B: confidence score logged', 'Posterior probability updated', 'Confidence threshold breached'] },
      { type: 'revision' as const, templates: ['Prediction revised mid-sequence', 'Model B: forecast overridden', 'Prior estimate superseded', 'Revision triggered by new input', 'Retroactive correction applied', 'Prediction rollback executed', 'Model B: belief update logged', 'Adaptive revision cycle complete'] },
      { type: 'metric' as const, templates: ['NOESIS metrics updated', 'Performance analysis complete', 'Stability measurement recorded', 'Variability index calculated', 'Deviation analysis performed', 'Reactivity assessment updated', 'NOESIS behavioral snapshot saved', 'Prediction accuracy trend logged'] },
      { type: 'anomaly' as const, templates: ['Anomalous behavior detected', 'Unexpected pattern observed', 'Deviation from baseline', 'Anomaly threshold exceeded', 'Irregular response pattern', 'NOESIS anomaly flagged', 'Unpredicted sequence element received', 'Pattern break event logged'] },
      { type: 'performance' as const, templates: ['Performance metrics logged', 'Efficiency analysis complete', 'Response time optimized', 'System performance stable', 'Optimization cycle complete', 'Rolling accuracy benchmark updated', 'Prediction throughput confirmed'] },
    ]

    const addLog = () => {
      // Track accuracy for metrics
      if (accuracy > 0) {
        accuraciesRef.current.push(accuracy)
        if (accuraciesRef.current.length > 10) {
          accuraciesRef.current.shift()
        }
      }

      // Simulate response time tracking
      const responseTime = 300 + Math.random() * 500
      responseTimesRef.current.push(responseTime)
      if (responseTimesRef.current.length > 10) {
        responseTimesRef.current.shift()
      }

      // Track change events
      if (Math.random() < 0.1) {
        changeEventsRef.current += 1
      }

      const newLog = generatePatternPredictionLogMessage(messages, {
        experimentId: experimentIdRef.current,
        recentAccuracies: accuraciesRef.current,
        recentResponseTimes: responseTimesRef.current,
        currentAccuracy: accuracy,
        expectedAccuracy: 75,
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

