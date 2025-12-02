"use client";

import { useEffect, useState, useRef, memo } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../components/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon, Sparkles, X, Plus } from "lucide-react";
import Image from "next/image";
import { projectService } from "@/services/project.service";
import { imageService } from "@/services/image.service";
import { toast } from "sonner";
import { publicEnv } from "@/env/index";

const ResponsiveImage = memo(function ResponsiveImage({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) {
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    let mounted = true;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if (!mounted) return;
      setSize({ w: img.naturalWidth, h: img.naturalHeight });
    };
    img.onerror = () => {
      if (!mounted) return;
      setSize({ w: 300, h: 200 });
    };
    return () => {
      mounted = false;
    };
  }, [src]);

  if (!size) {
    return (
      <div className="w-full bg-muted-foreground/5" style={{ minHeight: 96 }} />
    );
  }

  const maxDisplayWidth = 250;
  const displayWidth = Math.min(size.w, maxDisplayWidth);
  const displayHeight = Math.round((displayWidth * size.h) / size.w);

  return (
    <div
      style={{ width: displayWidth, height: displayHeight }}
      className="relative"
    >
      <Image
        src={src}
        alt={alt ?? "image"}
        width={displayWidth}
        height={displayHeight}
        unoptimized
        className="object-contain"
      />
    </div>
  );
});

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter();
  const { id } = params || { id: undefined };
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!id) {
      setLoading(false);
      return;
    }

    (async () => {
      const res = await projectService.getProjectById(id);
      if (!mounted) return;
      if (res.success && res.data) {
        setProject(res.data);
      }
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    const urls = selectedFiles.map((f) => URL.createObjectURL(f));
    setPreviews(urls);

    return () => {
      urls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [selectedFiles]);

  const fileInputId = `project-file-input-${Math.random()
    .toString(36)
    .slice(2, 9)}`;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelected = (files: FileList | null) => {
    if (!files) return;
    const imgs = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imgs.length === 0) return;
    setSelectedFiles((prev) => [...prev, ...imgs]);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelected(e.target.files);
    e.currentTarget.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFilesSelected(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const removePreview = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (!project || selectedFiles.length === 0) return;
    setUploading(true);
    try {
      let res;

      if (selectedFiles.length === 1) {
        res = await imageService.uploadImage(selectedFiles[0], project.id);
      } else {
        res = await imageService.uploadBatch(selectedFiles, project.id);
      }

      if (!res || !res.success) {
        toast.error(res?.message || "Erro ao enviar imagens");
        return;
      }

      toast.success("Upload concluído");

      const fres = await projectService.getProjectById(project.id);
      if (fres.success && fres.data) setProject(fres.data);

      setSelectedFiles([]);
    } catch (err) {
      toast.error("Erro ao enviar imagens");
    } finally {
      setUploading(false);
    }
  };

  const [actionMode, setActionMode] = useState<
    "detection" | "upscale" | "filter"
  >("detection");
  const [detectionValue, setDetectionValue] = useState<number>(0.5);
  const [upscaleValue, setUpscaleValue] = useState<number>(2);
  const [filterValue, setFilterValue] = useState<string>("candy");

  if (loading) return <div className="p-6">Carregando projeto...</div>;

  if (!project)
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold">Projeto não encontrado</h2>
        <div className="mt-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            Voltar
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8 pt-20 md:pt-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {project.name}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {project.description}
            </p>
          </div>

          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6 md:mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Array.isArray(project.images) ? project.images.length : 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Imagens</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Sparkles className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Processadas</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Upload className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6 md:p-12">
            <div>
              {Array.isArray(project.images) && project.images.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold">
                    Imagens do projeto
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {project.images.map((img: any, idx: number) => {
                      const fileKey =
                        img?.fileKey ?? img?.file_key ?? img?.key ?? img;
                      const src = `${publicEnv.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN}/${fileKey}`;
                      return (
                        <div
                          key={fileKey ?? idx}
                          className="rounded-md overflow-hidden border p-1 flex items-center justify-center"
                        >
                          <ResponsiveImage
                            src={src}
                            alt={`project-img-${idx}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {Array.isArray(project.images) && project.images.length > 0 ? (
                <div className="flex items-center justify-between gap-4 p-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-violet-600 text-white shadow"
                      aria-label="Adicionar imagens"
                    >
                      <Plus className="h-5 w-5" />
                    </button>

                    <Button
                      variant="outline"
                      onClick={handleUpload}
                      disabled={uploading || selectedFiles.length === 0}
                    >
                      {uploading ? "Enviando..." : "Enviar imagens"}
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      value={actionMode}
                      onChange={(e) => setActionMode(e.target.value as any)}
                      className="rounded-md border px-3 py-2"
                    >
                      <option value="detection">Detectar objeto</option>
                      <option value="upscale">Ampliação</option>
                      <option value="filter">Filtros</option>
                    </select>

                    {actionMode === "detection" && (
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={detectionValue}
                          onChange={(e) =>
                            setDetectionValue(Number(e.target.value))
                          }
                          className="w-40"
                        />
                        <span className="text-sm">
                          {detectionValue.toFixed(2)}
                        </span>
                      </div>
                    )}

                    {actionMode === "upscale" && (
                      <select
                        value={upscaleValue}
                        onChange={(e) =>
                          setUpscaleValue(Number(e.target.value))
                        }
                        className="rounded-md border px-3 py-2"
                      >
                        <option value={2}>2x</option>
                        <option value={4}>4x</option>
                      </select>
                    )}

                    {actionMode === "filter" && (
                      <select
                        value={filterValue}
                        onChange={(e) => setFilterValue(e.target.value)}
                        className="rounded-md border px-3 py-2"
                      >
                        <option value="candy">candy</option>
                        <option value="mosaic">mosaic</option>
                        <option value="rain_princess">rain_princess</option>
                        <option value="udnie">udnie</option>
                      </select>
                    )}
                  </div>

                  <input
                    id={fileInputId}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={onFileInputChange}
                  />
                </div>
              ) : (
                <div
                  className={`rounded-md border-2 p-6 text-center transition-colors ${
                    dragActive
                      ? "border-dashed border-primary bg-primary/5"
                      : "bg-transparent"
                  }`}
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4 md:p-6">
                      <Upload className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                    </div>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    Envie suas primeiras imagens
                  </h2>

                  <p className="text-muted-foreground mb-4 max-w-md mx-auto text-sm md:text-base">
                    Arraste e solte suas imagens aqui ou clique no botão abaixo
                    para selecioná-las do seu computador.
                  </p>

                  <input
                    id={fileInputId}
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={onFileInputChange}
                  />

                  <div className="flex items-center justify-center gap-3">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-5 w-5" />
                      Selecionar Imagens
                    </Button>
                    {selectedFiles.length > 0 && (
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? "Enviando..." : "Enviar"}
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {previews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {previews.map((src, idx) => (
                    <div
                      key={src}
                      className="relative rounded-md overflow-hidden border p-1 flex items-center justify-center"
                    >
                      <ResponsiveImage src={src} alt={`preview-${idx}`} />
                      <button
                        type="button"
                        onClick={() => removePreview(idx)}
                        className="absolute top-1 right-1 inline-flex items-center justify-center rounded-full bg-gray-500 p-1"
                        aria-label="Remover imagem"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
