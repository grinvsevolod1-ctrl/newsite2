import SeoHead from './components/SeoHead';
import MiniPortfolio from './components/MiniPortfolio';

import Banner from './components/Banner/index';
import Aboutus from './components/Aboutus/index';
import Dedicated from './components/Dedicated/index';
import Digital from './components/Digital/index';
import Beliefs from './components/Beliefs/index';
import Wework from './components/Wework/index';
import Ourteam from './components/Ourteam/index';
import Featured from './components/Featured/index';
import Manage from './components/Manage/index';
import FAQ from './components/FAQ/index';
import Testimonials from './components/Testimonials/index';
import Articles from './components/Articles/index';
import Joinus from './components/Joinus/index';
import Insta from './components/Insta/index';

export default function Home() {
  return (
    <>
      <SeoHead
        title="NetNext.site — Студия адаптивных цифровых решений"
        description="Мы создаём Telegram-ботов, мобильные приложения, CRM, сайты, брендинг и автоматизацию. Всё адаптивно, масштабируемо и готово к интеграции."
        url="https://netnext.site"
        image="https://netnext.site/images/og-default.jpg"
        canonical="https://netnext.site"
        keywords="NetNext, веб-разработка, Telegram-боты, CRM, мобильные приложения, брендинг, автоматизация, SMM"
      />
      <main>
        <Banner />
        <Aboutus />
        <Dedicated />
        <Digital />
        <MiniPortfolio /> {/* 👈 интеграция портфолио */}
        <Beliefs />
        <Wework />
        <Ourteam />
        {/* <Featured /> */}
        <Manage />
        <FAQ />
        <Testimonials />
        <Articles />
        <Joinus />
        <Insta />
      </main>
    </>
  );
}
