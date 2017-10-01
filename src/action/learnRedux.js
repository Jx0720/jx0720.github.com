//  同步例子
export const CHANGE_DESC_VAL = 'CHANGE_DESC_VAL'

export function changeDescVal (newVal) {
  return {
    type: CHANGE_DESC_VAL,
    newVal
  }
}
