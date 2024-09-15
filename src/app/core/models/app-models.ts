export const enum TypeMessage {
  info = "INFO",
  warning = "WARNING",
  error = "ERROR"
}

export interface Token {
  access_token: string
  token_type: string
  expires_in: number
}

export interface StatusMjpeg {
  status: string
}

export interface MainButton {
  disable: boolean
  css: string
  label: string
  cmd: string | null
  params: string|number|null
}

export interface ErrorMessage {
  message: string
}

export interface ToastMessage {
  type: TypeMessage;
  message: string
}

export interface Preset {
  id:number
  width: number
  height: number
  fps: number
  i_width: number
  i_height: number
  i_rate: number
  name: string
  mode: string
}

export interface UserLevel {
  name: string
  right: number
}

export interface Locales {
  locales: string[]
}

export interface Thumb {
  id: string
  name: string
  type: string
  size: number
  datetime: Date
  locked: boolean
  realname: string
  number: string
  lcount: number
  duration: number
  uri: string
  selected: boolean
}

export interface FreeDisk {
  total: number
  used: number
  free: number
  prc: number
  color: string
}

export interface Log {
  datetime: string
  level: string
  msg: string
}

export interface Period {
  period: string
}

export interface SchedulerSettings {
  autocamera_interval: number
  autocapture_interval: number
  cmd_poll: number
  dawnstart_minutes: number
  dayend_minutes: number
  daymode: number
  daystart_minutes: number
  duskend_minutes: number
  gmt_offset: string
  latitude: number
  longitude: number
  managment_command: string
  managment_interval: number
  max_capture: number
  mode_poll: number
  purgeimage_hours: number
  purgelapse_hours: number
  purgevideo_hours: number
  purgespace_level: number
  purgespace_modeex: number
}

export interface SchedulerDay {
  id: number
  command_on: string
  command_off: string
  daysmode: Daysmode
  period: string
  mode: string
  calendars: {
    Mon: number,
    Tue: number,
    Wed: number,
    Thu: number,
    Fri: number,
    Sat: number,
    Sun: number,
  }
}

export interface Daysmode {
  id: number
  name: string
}

export interface SchedulerState {
  start:number
  stop: number
  state: boolean
}

export interface Settings {
  servo: boolean
  pipan: boolean
  pilight: boolean
  upreset: string
  loglevel: string
}

export interface CamToken {
  cam_token: string
}

export interface ApiToken {
  api_token: string
}

export interface RaspiCmd {
  cmd: string,
  params: string[]
}

export interface Rsync {
rs_enabled: boolean
rs_user: string
rs_pwd: string
rs_direction: string
rs_mode: string
rs_remote_host: string
rs_options: string[]
}

export interface Multiview {
  id: number
  url: string
  delay: number
  state: boolean
}

export interface UserButton{
  id: number
  display: boolean
  name: string
  macro: string
  css_class: string
  style: string
  other: string
}

export interface Macros   {
  name: string
  command: string
  state: boolean
}

export interface User   {
  id: number
  name: string
  password:string
  right: number
  otp_confirmed: boolean
  otp_svg: string
}

export interface Login   {
  username: string
  password:string
  password_2:string
  remember: boolean
  next: boolean
  otp_code: string
}

export interface current_user   {
  id: number
  name: string
  right: number
  otp_confirmed:boolean
}

export interface OtpSecret {
  secret:number
}
