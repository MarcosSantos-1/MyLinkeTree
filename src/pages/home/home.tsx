import { useEffect, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { GrGithub } from 'react-icons/gr';

import { Social } from '../../assets/components/social';
import { db } from '../../services/firebase-connection';
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from 'firebase/firestore';

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  textColor: string;
}
interface SocialLinksProps {
  facebook: string;
  github: string;
  instagram: string;
}

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLinks() {
      const linksRef = collection(db, 'links');
      const queryRef = query(linksRef, orderBy('created', 'asc'));
      const snapshot = await getDocs(queryRef);
      const lista: LinksProps[] = [];
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          textColor: doc.data().textColor,
        });
      });
      setLinks(lista);
    }

    async function loadSocialLinks() {
      const docRef = doc(db, 'social', 'link');
      const snapshot = await getDoc(docRef);
      if (snapshot.data() !== undefined) {
        setSocialLinks({
          facebook: snapshot.data()?.facebook,
          github: snapshot.data()?.github,
          instagram: snapshot.data()?.instagram,
        });
      }
    }

    Promise.all([loadLinks(), loadSocialLinks()]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="w-16 h-16 border-8 border-yellow-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-bold text-center flex " >Carregando</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col py-4 items-center justify-center">
        <h1 className="font-bold text-3xl md:text-4xl mt-20">Marcos Vinicius</h1>
        <span className="text-gray-50 mt-7 mb-5">Veja meus links 👇</span>

        <main className="max-w-sm w-full px-2 py-2">
          {links.map((link) => (
            <section className="flex flex-col gap-4" key={link.id}>
              <a
                className="transition-transform select-none hover:scale-105 cursor-pointer my-2"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="w-full rounded-lg text-zinc-50 font-semibold px-3 py-2 h-12"
                  style={{ backgroundColor: link.bg, color: link.textColor }}
                >
                  {link.name}
                </button>
              </a>
            </section>
          ))}

          {socialLinks && Object.keys(socialLinks).length > 0 && (
            <footer className="flex mt-5 mb-3 gap-3 justify-center">
              <Social url={socialLinks?.facebook}>
                <FaFacebook className="text-white w-6 h-6 transition-transform hover:scale-110 cursor-pointer" />
              </Social>
              <Social url={socialLinks?.github}>
                <GrGithub className="text-white w-6 h-6 transition-transform hover:scale-110 cursor-pointer" />
              </Social>
              <Social url={socialLinks?.instagram}>
                <BsInstagram className="text-white w-6 h-6 transition-transform hover:scale-110 cursor-pointer" />
              </Social>
            </footer>
          )}
        </main>
      </div>
    </>
  );
}
