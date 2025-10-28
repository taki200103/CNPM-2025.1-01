// src/types/notification.types.ts

export interface NotificationResident {
    notificationId: string;
    residentId: string;
  }
  
  export interface Notification {
    id: string;
    createdAt: string;
    info: string;
    creator: string;
    residents: NotificationResident[];
  }
  
  export interface CreateNotificationDto {
    info: string;
    residentIds: string[]; // Danh sách ID cư dân nhận thông báo
  }
  
  export interface UpdateNotificationDto {
    info?: string;
    residentIds?: string[];
  }