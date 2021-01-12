export interface SendEmailDto {
  template: string
  recipent: string
  dryRun?: boolean
}
