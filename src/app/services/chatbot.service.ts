import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatbotService {

  private kb: Record<string, string> = {
    services: `🚀 We offer three core services:\n\n• **Website Development** – Angular, React, Node.js, TypeScript\n• **AI Development** – Python, TensorFlow, LLMs, custom automation\n• **Logo & Brand Design** – Figma, brand systems, UI/UX\n\nWant details on any specific service?`,
    // pricing: `💰 Our pricing is transparent and project-based:\n\n• **Landing Page** – from ₹15,000\n• **Web Application** – from ₹50,000\n• **AI Integration** – from ₹40,000\n• **Brand Identity** – from ₹12,000\n\nAll projects get a free initial consultation!`,
    timeline: `⏱️ Typical delivery timelines:\n\n• Landing page – 3–5 days\n• Web application – 2–6 weeks\n• AI solution – 2–4 weeks\n• Brand identity – 5–7 days\n\nWe use agile sprints so you see progress every step of the way!`,
    started: `✅ Getting started is simple!\n\n1. Fill out our contact form with project details\n2. We'll reply within 24 hours with a free consultation\n3. Agree on scope & pricing\n4. We start building! 🎉`,
    contact: `📩 You can reach us at:\n\n• Email: admin@bluekod.com\n• Phone/WhatsApp: +91 7026032850\n• Working hours: Mon–Sat, 9am–6pm IST\n\nWe work with clients worldwide!`,
    team: `👥 BlueKod is a small but mighty team:\n\n• **Sanath S Shetty.** – Lead Developer\n• **Aarav Shetty.** – UI/UX Designer\n• **KP Shashank.** – AI Engineer\n• **Manoj Naik.** – Project Lead\n\nEvery project gets dedicated attention from our whole team.`,
    about: `🏢 BlueKod was founded with a single mission — to make world-class technology accessible to every business. We're a remote-first team based in India, serving clients globally since 2021.`,
    default: `🤔 Great question! I'm still learning, but our team can answer that personally.\n\nAsk about:\n• Services  • Pricing  • Timeline  • Getting started  • Our team`,
  };

  getReply(message: string): string {
    const m = message.toLowerCase();
    if (m.includes('service') || m.includes('offer') || m.includes('do you')) return this.kb['services'];
    if (m.includes('pric') || m.includes('cost') || m.includes('fee') || m.includes('cheap')) return this.kb['pricing'];
    if (m.includes('time') || m.includes('long') || m.includes('fast') || m.includes('deadline') || m.includes('quick')) return this.kb['timeline'];
    if (m.includes('start') || m.includes('begin') || m.includes('hire') || m.includes('work with')) return this.kb['started'];
    if (m.includes('contact') || m.includes('email') || m.includes('phone') || m.includes('reach') || m.includes('whatsapp')) return this.kb['contact'];
    if (m.includes('team') || m.includes('who') || m.includes('founder') || m.includes('people')) return this.kb['team'];
    if (m.includes('about') || m.includes('company') || m.includes('bluekod')) return this.kb['about'];
    return this.kb['default'];
  }
}
