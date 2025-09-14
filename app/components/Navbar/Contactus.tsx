"use client";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Link from 'next/link';

const Contactusform = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValues, setInputValues] = useState({ name: '', message: '' });
  const [contactMethod, setContactMethod] = useState('');
  const [contactValue, setContactValue] = useState('');

  const contactOptions = [
    'Email', 'Telegram', 'WhatsApp', 'VK', 'Facebook',
    'Телефон', 'Viber', 'Instagram', 'TikTok'
  ];

  const getPlaceholder = (method: string) => {
    switch (method.toLowerCase()) {
      case 'email': return 'your_email@example.com';
      case 'телефон': return '+375 (__) ___-__-__';
      case 'telegram': return '@your_username';
      case 'whatsapp': return '+375 (__) ___-__-__';
      case 'instagram': return '@your_handle';
      default: return 'Введите данные...';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = `
🆕 Новый контакт:
👤 Имя: ${inputValues.name}
📡 Способ связи: ${contactMethod}
📱 Данные: ${contactValue}
💬 Сообщение: ${inputValues.message}
    `;

    await fetch(`https://api.telegram.org/bot7971685388:AAFshMdeIWWiwLPZdp2os2vgwVDp9PTP4eU/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: 940316027,
        text: message
      })
    });

    setIsOpen(false);
    setInputValues({ name: '', message: '' });
    setContactMethod('');
    setContactValue('');
  };

  const fallbackIcon = "/images/footer/vec.svg";

  return (
    <>
      {/* 🔗 Соц-ссылки */}
      <div className="flex gap-4 items-center">
        <Link href="https://instagram.com/netnext.site" target="_blank">
          <img
            src="/images/footer/instagram.svg"
            alt="Instagram"
            title="Instagram"
            className="w-8 h-8 hover:scale-110 transition-transform"
            onError={(e) => (e.currentTarget.src = fallbackIcon)}
          />
        </Link>
        <Link href="https://t.me/skufig1" target="_blank">
          <img
            src="/images/footer/telegram.svg"
            alt="Telegram"
            title="Telegram"
            className="w-8 h-8 hover:scale-110 transition-transform"
            onError={(e) => (e.currentTarget.src = fallbackIcon)}
          />
        </Link>
        <a href="tel:+375291414555">
          <img
            src="/images/footer/phone.svg"
            alt="Phone"
            title="Позвонить"
            className="w-8 h-8 hover:scale-110 transition-transform"
            onError={(e) => (e.currentTarget.src = fallbackIcon)}
          />
        </a>
      </div>

      {/* 📍 Кнопка в правом нижнем углу */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-navyblue text-white rounded-full px-4 py-2 text-sm shadow-md hover:scale-105 transition-transform duration-300"
        >
          Связаться
        </button>
      </div>

      {/* 💬 Модальное окно */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="py-4 px-2">
                    <h2 className="text-2xl font-semibold text-center mb-4">NetNext</h2>
                    <p className="text-sm text-gray-500 text-center mb-6">Выберите способ связи и оставьте сообщение</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="text"
                        name="name"
                        value={inputValues.name}
                        onChange={handleChange}
                        required
                        placeholder="Ваше имя"
                        className="w-full border border-linegrey rounded-md px-3 py-2"
                      />

                      <select
                        value={contactMethod}
                        onChange={(e) => setContactMethod(e.target.value)}
                        required
                        className="w-full border border-linegrey rounded-md px-3 py-2 capitalize"
                      >
                        <option value="">Выберите способ связи</option>
                        {contactOptions.map((method) => (
                          <option key={method} value={method}>{method}</option>
                        ))}
                      </select>

                      {contactMethod && (
                        <input
                          type="text"
                          value={contactValue}
                          onChange={(e) => setContactValue(e.target.value)}
                          placeholder={getPlaceholder(contactMethod)}
                          required
                          className="w-full border border-linegrey rounded-md px-3 py-2"
                        />
                      )}

                      <textarea
                        name="message"
                        value={inputValues.message}
                        onChange={handleChange}
                        required
                        placeholder="Ваше сообщение..."
                        className="w-full border border-linegrey rounded-md px-3 py-2"
                      />

                      <button
                        type="submit"
                        className="w-full bg-blue text-white py-2 rounded-md hover:bg-navyblue transition"
                      >
                        Отправить
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Contactusform;
