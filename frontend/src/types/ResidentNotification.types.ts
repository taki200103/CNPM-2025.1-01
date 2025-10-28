export interface Notification {
  id: string;
  createdAt: string;
  info: string;
  creator: string;
}

export interface ResidentNotification {
  notificationId: string;
  residentId: string;
  notification: Notification;
}

export interface CreateResidentNotificationDto {
  residentId: string;
  info: string;
  creator: string;
}

export interface UpdateResidentNotificationDto {
  info?: string;
  creator?: string;
}

export type ResidentNotificationResponse = ResidentNotification;


