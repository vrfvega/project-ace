'use server'

import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type LobbyResponse = {
  success: boolean
  lobbyId?: string
  error?: string
  playerName?: string
}

export async function createLobby(formData: FormData): Promise<LobbyResponse> {
  const playerName = formData.get('playerName') as string

  if (!playerName) {
    return {
      success: false,
      error: 'Player name is required'
    }
  }

  try {
    const lobbyId = nanoid(10)
    const cookieStore = await cookies()

    cookieStore.set({
      name: 'host',
      value: 'true',
      path: '/'
    })
    cookieStore.set({
      name: 'lobbyId',
      value: lobbyId,
      path: '/'
    })
    cookieStore.set({
      name: 'playerName',
      value: playerName,
      path: '/'
    })

    return {
      success: true,
      lobbyId
    }
  } catch (error) {
    return {
      success: false,
      error: 'Failed to create lobby'
    }
  }
}

export async function joinLobby(formData: FormData): Promise<LobbyResponse> {
  try {
    const lobbyId = formData.get('lobbyId') as string
    const playerName = formData.get('playerName') as string

    if (!lobbyId || !playerName) {
      return {
        success: false,
        error: 'Lobby ID and player name are required'
      }
    }

    const cookieStore = await cookies()
    cookieStore.set('lobbyId', lobbyId)
    cookieStore.set('playerName', playerName)

    redirect(`/lobby/${lobbyId}`)
  } catch (error) {
    return {
      success: false,
      error: 'Failed to join lobby'
    }
  }
}
