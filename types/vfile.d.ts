export {VFile} from "vfile"
export {VFileMessage} from "vfile-message"

export function createVFileMessage(
  reason: string,
  options?: import("vfile-message").Options,
): import("vfile-message").VFileMessage
