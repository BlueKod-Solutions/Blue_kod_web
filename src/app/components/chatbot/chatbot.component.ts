import { Component, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChatMessage, QuickReply } from '../../models/models';
import { ChatbotService } from '../../services/chatbot.service';
import { BkBoldPipe } from './bk-bold.pipe';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, BkBoldPipe],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('msgList') msgList!: ElementRef<HTMLDivElement>;

  isOpen = false;
  userInput = '';
  isTyping = false;
  showQuickReplies = true;

  messages: ChatMessage[] = [
    { text: "👋 Hi there! I'm the BlueKod AI assistant. How can I help you today?", isUser: false, timestamp: new Date() },
    { text: "You can ask me about our services, pricing, timelines, or anything else!", isUser: false, timestamp: new Date() },
  ];

  quickReplies: QuickReply[] = [
    { label: 'Our Services',  query: 'What services do you offer?' },
<<<<<<< HEAD
    // { label: 'Pricing',       query: 'What is your pricing?' },
=======
    { label: 'Pricing',       query: 'What is your pricing?' },
>>>>>>> fa3d71a791777d93ddab996af85eecf12ebaa5a1
    { label: 'Timeline',      query: 'How long does a project take?' },
    { label: 'Get Started',   query: 'How do I get started?' },
  ];

  constructor(private chatbot: ChatbotService) {}

  ngAfterViewChecked(): void { this.scrollToBottom(); }

  toggle(): void { this.isOpen = !this.isOpen; }

  send(): void {
    const text = this.userInput.trim();
    if (!text) return;

    this.messages.push({ text, isUser: true, timestamp: new Date() });
    this.userInput = '';
    this.showQuickReplies = false;
    this.isTyping = true;

    const delay = 800 + Math.random() * 500;
    setTimeout(() => {
      this.isTyping = false;
      this.messages.push({
        text: this.chatbot.getReply(text),
        isUser: false,
        timestamp: new Date(),
      });
    }, delay);
  }

  quickAsk(query: string): void {
    this.userInput = query;
    this.send();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') this.send();
  }

  private scrollToBottom(): void {
    try {
      if (this.msgList) {
        this.msgList.nativeElement.scrollTop = this.msgList.nativeElement.scrollHeight;
      }
    } catch (_) {}
  }
}
