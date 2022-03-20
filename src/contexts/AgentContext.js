import React, { createContext, useContext, useReducer } from 'react'

import { DEFAULT_AGENTS } from './data'

const StateContext = createContext(undefined)

const DispatchContext = createContext(undefined)

const StateReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_AGENT_DIALOG': {
      const agents = state.agents.map((agent) => {
        if (agent.key === action.payload.agentKey) {
          return {
            ...agent,
            dialogs: action.payload.newAgentDialogs,
          }
        }
        return agent
      })

      return {
        ...state,
        agents,
      }
    }

    case 'UPDATE_AGENT_INTENTS': {
      const agents = state.agents.map((agent) => {
        if (agent.key === action.payload.agentKey) {
          return {
            ...agent,
            intents: action.payload.newIntents,
          }
        }
        return agent
      })

      return {
        ...state,
        agents,
      }
    }

    case 'UPDATE_AGENT_ENTITIES': {
      const agents = state.agents.map((agent) => {
        if (agent.key === action.payload.agentKey) {
          return {
            ...agent,
            entities: action.payload.newEntities,
          }
        }
        return agent
      })

      return {
        ...state,
        agents,
      }
    }

    default:
      return state
  }
}

function AgentContext({ children }) {
  const [state, dispatch] = useReducer(StateReducer, {
    agents: DEFAULT_AGENTS,
  })

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const useContextState = () => {
  const state = useContext(StateContext)

  if (state !== undefined) {
    return state
  }

  throw new Error('useContextState must be used inside ContextProvider')
}

const useContextDispatch = () => {
  const dispatch = useContext(DispatchContext)

  if (dispatch !== undefined) {
    return dispatch
  }

  throw new Error('useContextDispatch must be used inside ContextProvider')
}

export { AgentContext, useContextState, useContextDispatch, StateContext, DispatchContext }
