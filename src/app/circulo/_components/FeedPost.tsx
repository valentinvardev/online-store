import Link from "next/link";
import Image from "next/image";
import {
  Lock, Sparkles, MessageCircle, ArrowRight,
  FileText, Video, Headphones, Image as ImageIcon, MessageSquare, Paperclip,
} from "lucide-react";
import { CIRCULO_CHECKOUT } from "~/lib/access";
import PostBody from "./PostBody";

const fmt = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long", year: "numeric" });

const typeMeta: Record<string, { label: string; icon: React.ReactNode }> = {
  TEXT: { label: "Lectura", icon: <FileText size={11} /> },
  VIDEO: { label: "Video", icon: <Video size={11} /> },
  AUDIO: { label: "Audio", icon: <Headphones size={11} /> },
  GALLERY: { label: "Galería", icon: <ImageIcon size={11} /> },
};

type FeedPostData = {
  id: string;
  slug: string;
  title: string | null;
  excerpt: string | null;
  contentType: "TEXT" | "VIDEO" | "AUDIO" | "GALLERY";
  content: string;
  coverImageUrl: string | null;
  videoUrl: string | null;
  audioUrl: string | null;
  images: string[];
  attachments: string[];
  publishedAt: Date | null;
  commentCount: number;
  attachmentCount: number;
  locked: boolean;
};

export default function FeedPost({ post }: { post: FeedPostData }) {
  const isMessage = !post.title;
  const isTextArticle = post.contentType === "TEXT" && !!post.title;
  const meta = isMessage
    ? { label: "Mensaje", icon: <MessageSquare size={11} /> }
    : typeMeta[post.contentType]!;

  return (
    <article className="bg-white border-2 border-morado-dark block-shadow">
      {/* ── Header de autor (estilo creator) ── */}
      <div className="flex items-center gap-3 px-5 sm:px-6 pt-5 pb-3">
        <div className="w-11 h-11 rounded-full bg-morado-dark border-2 border-morado-dark flex items-center justify-center shrink-0 overflow-hidden">
          <Image
            src="/logo-rdb.png"
            alt="La Reina de Bastos"
            width={40}
            height={40}
            className="w-8 h-auto"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="min-w-0">
          <p className="font-sans font-bold text-[0.82rem] text-tierra-dark leading-tight">
            La Reina de Bastos
          </p>
          <div className="flex items-center gap-1.5 text-[0.68rem] text-tierra/50 tracking-wide">
            {post.publishedAt && <span>{fmt.format(post.publishedAt)}</span>}
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-morado/80 font-semibold uppercase tracking-widest text-[0.6rem]">
              {meta.icon} {meta.label}
            </span>
            {post.attachmentCount > 0 && (
              <span className="inline-flex items-center gap-1 text-dorado-dark font-semibold uppercase tracking-widest text-[0.6rem]">
                <Paperclip size={10} />
                {post.attachmentCount} {post.attachmentCount === 1 ? "archivo" : "archivos"}
              </span>
            )}
          </div>
        </div>
        {post.locked && (
          <span className="ml-auto shrink-0 inline-flex items-center gap-1 font-sans text-[0.58rem] text-tierra/55 tracking-widest uppercase bg-tierra/8 border border-tierra/15 px-2 py-1">
            <Lock size={9} /> Socias
          </span>
        )}
      </div>

      {/* ── Título (artículos) ── */}
      {post.title && (
        <Link href={`/circulo/${post.slug}`} className="block px-5 sm:px-6 group">
          <h2 className="font-sans font-bold text-[clamp(1.2rem,3vw,1.55rem)] text-tierra-dark leading-snug tracking-wide group-hover:text-morado transition-colors">
            {post.title}
          </h2>
        </Link>
      )}

      {/* ── Cuerpo según formato ── */}
      <div className="px-5 sm:px-6 py-4">
        {post.locked ? (
          <LockedTeaser post={post} />
        ) : isTextArticle ? (
          <div>
            {post.excerpt && (
              <p className="font-sans text-tierra-dark/85 text-[15px] sm:text-base leading-relaxed tracking-wide line-clamp-5">
                {post.excerpt}
              </p>
            )}
            <Link
              href={`/circulo/${post.slug}`}
              className="inline-flex items-center gap-1.5 mt-3 font-sans font-semibold text-[0.72rem] text-morado tracking-widest uppercase hover:gap-2.5 transition-all"
            >
              Leer más <ArrowRight size={12} />
            </Link>
          </div>
        ) : (
          <PostBody post={post} />
        )}
      </div>

      {/* ── Footer: comentarios ── */}
      <Link
        href={`/circulo/${post.slug}`}
        className="flex items-center gap-2 border-t-2 border-morado/10 px-5 sm:px-6 py-3 text-tierra/60 hover:text-morado hover:bg-dorado/5 transition-colors group"
      >
        <MessageCircle size={15} />
        <span className="font-sans font-semibold text-[0.72rem] tracking-widest uppercase">
          {post.commentCount > 0
            ? `${post.commentCount} ${post.commentCount === 1 ? "comentario" : "comentarios"}`
            : post.locked ? "Ver" : "Comentar"}
        </span>
        <ArrowRight size={13} className="ml-auto group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  );
}

/* Teaser de contenido bloqueado dentro del feed */
function LockedTeaser({ post }: { post: FeedPostData }) {
  return (
    <div className="relative bg-morado-dark border-2 border-morado-dark overflow-hidden">
      {post.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImageUrl} alt="" className="w-full h-44 sm:h-52 object-cover blur-md scale-105 opacity-60" />
      ) : (
        <div className="w-full h-40 sm:h-48 bg-gradient-to-br from-morado via-morado-mid to-rosa opacity-70" />
      )}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <Lock size={24} className="text-dorado mb-3" strokeWidth={1.8} />
        <p className="font-sans font-bold text-lg sm:text-xl text-crema tracking-wide leading-tight mb-3">
          Contenido para socias
        </p>
        <Link
          href={CIRCULO_CHECKOUT}
          className="inline-flex items-center gap-2 bg-dorado text-tierra-dark font-sans font-semibold text-[0.68rem] px-5 py-2.5 border-2 border-dorado hover:bg-dorado-light transition-colors tracking-widest uppercase block-shadow-sm"
        >
          <Sparkles size={12} /> Sumate al Círculo
        </Link>
      </div>
    </div>
  );
}
