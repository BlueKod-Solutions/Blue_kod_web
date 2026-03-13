export interface ChatMessage {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface QuickReply {
  label: string;
  query: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  accentRgb: string;
}

export interface WhyPoint {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

export interface Metric {
  icon: string;
  value: string;
  label: string;
  fillPercent: number;
  gradient: string;
}

export interface TeamMember {
  emoji: string;
  name: string;
  role: string;
  bg: string;
}

export interface ContactItem {
  icon: string;
  label: string;
  value: string;
}
