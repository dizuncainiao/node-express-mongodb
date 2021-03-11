import { isEmptyStr } from '@/components/vue3-dz-ui/lib/utils'

type EventType = 'focus' | 'blur';

interface InputStatus {
  active: boolean;
  filled: boolean;
}

// 获取 input 框的状态
export function useInputStatus (status: InputStatus, value: string, eventType: EventType) {
  status.active = eventType === 'focus' || !isEmptyStr(value)
  status.filled = eventType === 'blur'
}
