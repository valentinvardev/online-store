import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText, Download } from "lucide-react";
import { toEmbedUrl } from "~/lib/embed";
import AudioPlayer from "./AudioPlayer";

type Post = {
  contentType: "TEXT" | "VIDEO" | "AUDIO" | "GALLERY";
  content: string;
  videoUrl: string | null;
  audioUrl: string | null;
  images: string[];
  attachments: string[];
};

/* Markdown estilizado con la paleta de la marca (sin plugin typography). */
const mdComponents = {
  h1: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className="font-display uppercase text-[clamp(1.6rem,4vw,2.2rem)] text-tierra-dark tracking-wide mt-8 mb-3 leading-none" {...p} />,
  h2: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="font-display uppercase text-[clamp(1.3rem,3vw,1.7rem)] text-tierra-dark tracking-wide mt-7 mb-3 leading-none" {...p} />,
  h3: (p: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className="font-sans font-bold text-lg text-tierra-dark mt-6 mb-2 tracking-wide" {...p} />,
  p: (p: React.HTMLAttributes<HTMLParagraphElement>) => <p className="font-sans text-tierra-dark/85 text-[16px] leading-relaxed tracking-wide mb-4" {...p} />,
  ul: (p: React.HTMLAttributes<HTMLUListElement>) => <ul className="list-disc pl-6 space-y-1.5 mb-4 font-sans text-tierra-dark/85 text-[16px] leading-relaxed marker:text-morado" {...p} />,
  ol: (p: React.HTMLAttributes<HTMLOListElement>) => <ol className="list-decimal pl-6 space-y-1.5 mb-4 font-sans text-tierra-dark/85 text-[16px] leading-relaxed marker:text-morado" {...p} />,
  li: (p: React.HTMLAttributes<HTMLLIElement>) => <li className="pl-1" {...p} />,
  a: (p: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="text-morado underline underline-offset-2 hover:text-morado-dark transition-colors" target="_blank" rel="noopener noreferrer" {...p} />,
  strong: (p: React.HTMLAttributes<HTMLElement>) => <strong className="font-bold text-tierra-dark" {...p} />,
  em: (p: React.HTMLAttributes<HTMLElement>) => <em className="italic" {...p} />,
  blockquote: (p: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className="border-l-4 border-dorado pl-5 my-5 font-sans italic text-tierra-dark/75 text-lg leading-relaxed" {...p} />,
  hr: () => <hr className="my-8 border-t-2 border-morado/10" />,
  img: (p: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="w-full border-2 border-morado/15 my-5" alt="" {...p} />
  ),
};

export default function PostBody({ post }: { post: Post }) {
  const embed = post.contentType === "VIDEO" ? toEmbedUrl(post.videoUrl) : null;

  return (
    <div className="space-y-6">
      {/* Video */}
      {post.contentType === "VIDEO" && (
        embed ? (
          <div className="relative border-4 border-morado-dark block-shadow overflow-hidden bg-morado-dark" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={embed}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Video"
            />
          </div>
        ) : (
          <p className="font-sans text-sm text-rosa bg-rosa/10 border border-rosa/30 px-4 py-3">
            No pudimos leer el link del video.
          </p>
        )
      )}

      {/* Audio */}
      {post.contentType === "AUDIO" && post.audioUrl && (
        <AudioPlayer src={post.audioUrl} />
      )}

      {/* Galería */}
      {post.contentType === "GALLERY" && post.images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {post.images.map((src, i) => (
            <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="block aspect-square border-2 border-morado/15 overflow-hidden hover:opacity-90 transition-opacity">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Imagen ${i + 1}`} className="w-full h-full object-cover" />
            </a>
          ))}
        </div>
      )}

      {/* Cuerpo markdown (texto, o descripción de video/audio/galería) */}
      {post.content.trim() && (
        <div>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </div>
      )}

      {/* Adjuntos PDF */}
      {post.attachments.length > 0 && (
        <div className="border-t-2 border-morado/10 pt-5">
          <p className="font-sans text-[0.65rem] text-tierra/60 tracking-[0.3em] uppercase mb-3 font-bold">
            Material descargable
          </p>
          <ul className="space-y-2">
            {post.attachments.map((url, i) => (
              <li key={i}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border-2 border-morado/15 px-4 py-3 hover:border-morado/40 transition-colors group"
                >
                  <FileText size={16} className="text-morado shrink-0" />
                  <span className="flex-1 font-sans text-sm text-tierra-dark truncate">
                    {decodeURIComponent(url.split("/").pop() ?? "archivo.pdf")}
                  </span>
                  <Download size={14} className="text-tierra/40 group-hover:text-morado transition-colors shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
