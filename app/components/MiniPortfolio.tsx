import Link from "next/link";
import { cvData } from "@/app/lib/cvData";

const MiniPortfolio = () => {
  return (
    <section
      className="bg-white py-20 px-6 max-w-5xl mx-auto"
      itemScope
      itemType="https://schema.org/Person"
    >
      <h2 className="text-3xl font-bold text-center mb-6" itemProp="name">
        {cvData.name}
      </h2>
      <p className="text-center text-gray-700 mb-4" itemProp="description">
        {cvData.summary}
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cvData.skills.map((skill, i) => (
          <li
            key={i}
            className="bg-lightgrey rounded-xl p-4 text-sm text-gray-800 shadow hover:shadow-md transition"
          >
            {skill}
          </li>
        ))}
      </ul>
      <div className="text-center flex flex-wrap justify-center gap-4">
        <Link
          href={cvData.link}
          target="_blank"
          itemProp="url"
          className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
        >
          Смотреть полное CV
        </Link>
        {cvData.github && (
          <Link
            href={cvData.github}
            target="_blank"
            itemProp="sameAs"
            className="inline-block bg-darkpurple text-white px-6 py-3 rounded-full hover:bg-purple transition"
          >
            GitHub
          </Link>
        )}
        {cvData.telegram && (
          <Link
            href={cvData.telegram}
            target="_blank"
            itemProp="sameAs"
            className="inline-block bg-blue text-white px-6 py-3 rounded-full hover:bg-hoblue transition"
          >
            Telegram
          </Link>
        )}
        {cvData.linkedin && (
          <Link
            href={cvData.linkedin}
            target="_blank"
            itemProp="sameAs"
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-full hover:bg-sky-700 transition"
          >
            LinkedIn
          </Link>
        )}
      </div>
    </section>
  );
};

export default MiniPortfolio;
