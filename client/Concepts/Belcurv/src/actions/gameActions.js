export const MERGE_PLAYER_ARENA = 'MERGE_PLAYER_ARENA';
export const RESET_ARENA        = 'RESET_ARENA';
export const UPDATE_ARENA       = 'UPDATE_ARENA';
export const TOGGLE_PAUSE       = 'TOGGLE_PAUSE';
export const ROW_FLASH          = 'ROW_FLASH';

export function mergePlayerArena(player, arena) {
  return {
    type: MERGE_PLAYER_ARENA,
    player,
    arena
  };
}

export function resetArena() {
  return {
    type: RESET_ARENA
  };
}

export function updateArena(newArena) {
  return {
    type: UPDATE_ARENA,
    newArena
  };
}

export function togglePause() {
  return {
    type: TOGGLE_PAUSE
  };
}

export function rowFlash(row) {
  return {
    type: ROW_FLASH,
    row
  };
}
