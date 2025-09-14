import './globals.css';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import ChatBot from './components/ChatBot/ChatBot';

export const metadata = {
  title: 'NetNext',
  description: 'Адаптивные цифровые системы: Telegram-боты, сайты, приложения, CRM',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <Navbar />
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}
