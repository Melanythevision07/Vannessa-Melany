import React, { useState } from 'react';
import { PhotoItem } from '../types';
import { PixelHeart } from './PixelHeart';
import { sound } from '../utils/soundEngine';
import { Heart, Maximize2, X, Sparkles, Plus, Image as ImageIcon } from 'lucide-react';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  partnerName: string;
  onUpdatePhotos: (updated: PhotoItem[]) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  partnerName,
  onUpdatePhotos,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingList, setEditingList] = useState<PhotoItem[]>(photos);

  const handleLikePhoto = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    sound.playHeartBlip();
    const updated = photos.map((p) => {
      if (p.id === id) {
        return { ...p, heartCount: p.heartCount + 1 };
      }
      return p;
    });
    onUpdatePhotos(updated);

    if (selectedPhoto && selectedPhoto.id === id) {
      setSelectedPhoto({ ...selectedPhoto, heartCount: selectedPhoto.heartCount + 1 });
    }
  };

  const handleOpenPhoto = (photo: PhotoItem) => {
    sound.playCardFlip();
    setSelectedPhoto(photo);
  };

  const handleSaveEditedPhotos = () => {
    sound.playFanfare();
    onUpdatePhotos(editingList);
    setIsEditModalOpen(false);
  };

  return (
    <section id="photo-gallery-section" className="py-12 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FFFFFF] border-2 border-[#1E0711] px-3 py-1 mb-3 shadow-[2px_2px_0_0_#FF3366]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF3366]" />
          <span className="font-pixel text-[10px] text-[#FF3366] tracking-wider">
            VANESSA & MELANY
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#FF3366]" />
        </div>
        <h2 className="font-pixel text-xl sm:text-2xl text-[#1E0711] mb-2 tracking-tight">
          NUESTROS MOMENTOS FAVORITOS
        </h2>
        <p className="font-pixel-sub text-sm text-zinc-600 max-w-xl mx-auto mb-4">
          Cada fotografía es un recuerdo que guardaré por siempre en mi corazón. ¡Haz clic en cualquier recuerdo para verlo en grande!
        </p>

        {/* Quick Customizer Button */}
        <button
          id="gallery-edit-photos-btn"
          onClick={() => {
            sound.playCardFlip();
            setEditingList(photos);
            setIsEditModalOpen(true);
          }}
          className="pixel-button-white text-[10px] py-1.5 px-3 inline-flex items-center gap-1.5"
          title="Cambia o personaliza los enlaces de tus fotos"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#FF3366]" />
          <span>PERSONALIZAR FOTOS</span>
        </button>
      </div>

      {/* Responsive 8-bit Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo, index) => (
          /* ============================================================ */
          /* INSERTA TU FOTO AQUÍ:                                        */
          /* ¡Cada tarjeta muestra una imagen, título y nota de amor!     */
          /* ============================================================ */
          <div
            key={photo.id}
            id={`photo-card-${photo.id}`}
            onClick={() => handleOpenPhoto(photo)}
            className="group relative cursor-pointer pixel-card p-3 bg-white transition-all duration-200 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#FF3366]"
          >
            {/* Top Retro Pin / Tape Decor */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#FF3366] text-white border border-[#1E0711] px-2 py-0.5 font-pixel text-[8px] shadow-[2px_2px_0_0_#1E0711]">
              #{index + 1} AMOR
            </div>

            {/* Photo Container with Pixel Border */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FFE4EC] border-2 border-[#1E0711]">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay with Pixel Heart Pop-up */}
              <div className="absolute inset-0 bg-[#FF3366]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center pointer-events-none">
                <div className="pixel-pulse transform scale-110">
                  <PixelHeart size={44} color="#FFFFFF" outlineColor="#1E0711" />
                </div>
                <span className="font-pixel text-[10px] text-white bg-[#1E0711] px-2 py-1 mt-2 border border-white">
                  CLIC PARA VER
                </span>
              </div>
            </div>

            {/* Photo Info & Controls */}
            <div className="pt-3 px-1">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="font-pixel text-xs text-[#1E0711] truncate">
                  {photo.caption}
                </h3>
                {photo.date && (
                  <span className="font-pixel text-[8px] text-zinc-500 shrink-0">
                    {photo.date}
                  </span>
                )}
              </div>

              <p className="font-pixel-sub text-xs text-zinc-600 line-clamp-2 mb-3">
                {photo.memoryNote}
              </p>

              <div className="flex items-center justify-between border-t-2 border-[#FFE4EC] pt-2">
                <button
                  onClick={(e) => handleLikePhoto(e, photo.id)}
                  className="flex items-center gap-1.5 text-[#FF3366] hover:text-[#C2185B] transition-colors"
                  title="Enviar un corazón a este recuerdo"
                >
                  <Heart className="w-4 h-4 fill-[#FF3366]" />
                  <span className="font-pixel text-[9px]">{photo.heartCount}</span>
                </button>

                <span className="font-pixel text-[8px] text-zinc-400 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" /> VER
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-[#1E0711]/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="pixel-card bg-white max-w-2xl w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-4 border-[#1E0711] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <PixelHeart size={20} />
                <h3 className="font-pixel text-sm sm:text-base text-[#FF3366]">
                  {selectedPhoto.caption}
                </h3>
              </div>
              <button
                onClick={() => {
                  sound.playCardFlip();
                  setSelectedPhoto(null);
                }}
                className="p-1 border-2 border-[#1E0711] bg-[#FFE4EC] hover:bg-[#FF3366] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="border-4 border-[#1E0711] bg-[#FFE4EC] mb-4 overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[50vh] object-contain mx-auto"
              />
            </div>

            {/* Memory Note & Love Commentary */}
            <div className="bg-[#FFF5F7] border-2 border-[#1E0711] p-4 mb-4">
              <div className="flex items-center justify-between text-xs text-zinc-500 mb-2 font-pixel text-[9px]">
                <span className="text-[#C2185B]">RECUERDO ESPECIAL:</span>
                <span>{selectedPhoto.date || 'Guardado por siempre'}</span>
              </div>
              <p className="font-pixel-sub text-sm sm:text-base text-[#2A0815] leading-relaxed">
                "{selectedPhoto.memoryNote}"
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={(e) => handleLikePhoto(e, selectedPhoto.id)}
                className="pixel-button text-xs py-2 px-4 flex items-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>ENVIAR AMOR ({selectedPhoto.heartCount})</span>
              </button>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="pixel-button-white text-xs py-2 px-4"
              >
                CERRAR [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customizer / Photo URL Inserter Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1E0711]/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="pixel-card bg-white max-w-2xl w-full p-4 sm:p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-4 border-[#1E0711] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <PixelHeart size={20} />
                <h3 className="font-pixel text-xs sm:text-sm text-[#FF3366]">
                  PERSONALIZAR TUS FOTOS
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 border-2 border-[#1E0711] bg-[#FFE4EC] hover:bg-[#FF3366] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="font-pixel-sub text-xs text-zinc-600 mb-4">
              Pega los enlaces (URLs) de tus imágenes o personaliza las notas de amor. (¡También puedes editarlas en <code className="bg-zinc-100 px-1 font-mono text-[#C2185B]">src/config/loveData.ts</code>!)
            </p>

            <div className="space-y-4 mb-6">
              {editingList.map((item, idx) => (
                <div key={item.id} className="border-2 border-[#1E0711] p-3 bg-[#FFF9FA]">
                  <div className="flex items-center gap-2 mb-2 font-pixel text-[10px] text-[#FF3366]">
                    <span>FOTO #{idx + 1}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="font-pixel text-[8px] text-zinc-600 block mb-1">
                        URL DE LA IMAGEN:
                      </label>
                      <input
                        type="text"
                        value={item.url}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingList((prev) =>
                            prev.map((p) => (p.id === item.id ? { ...p, url: val } : p))
                          );
                        }}
                        className="w-full text-xs font-mono p-1.5 border-2 border-[#1E0711] bg-white"
                        placeholder="https://tu-imagen.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="font-pixel text-[8px] text-zinc-600 block mb-1">
                          TÍTULO / DESCRIPCIÓN:
                        </label>
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingList((prev) =>
                              prev.map((p) => (p.id === item.id ? { ...p, caption: val } : p))
                            );
                          }}
                          className="w-full text-xs p-1.5 border-2 border-[#1E0711] bg-white font-pixel-sub"
                        />
                      </div>
                      <div>
                        <label className="font-pixel text-[8px] text-zinc-600 block mb-1">
                          FECHA O MOMENTO:
                        </label>
                        <input
                          type="text"
                          value={item.date || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingList((prev) =>
                              prev.map((p) => (p.id === item.id ? { ...p, date: val } : p))
                            );
                          }}
                          className="w-full text-xs p-1.5 border-2 border-[#1E0711] bg-white font-pixel-sub"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="font-pixel text-[8px] text-zinc-600 block mb-1">
                        NOTA DEL RECUERDO / MENSAJE:
                      </label>
                      <textarea
                        rows={2}
                        value={item.memoryNote}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingList((prev) =>
                            prev.map((p) => (p.id === item.id ? { ...p, memoryNote: val } : p))
                          );
                        }}
                        className="w-full text-xs p-1.5 border-2 border-[#1E0711] bg-white font-pixel-sub"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 border-t-2 border-[#FFE4EC] pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="pixel-button-white text-xs py-2 px-4"
              >
                CANCELAR
              </button>
              <button
                onClick={handleSaveEditedPhotos}
                className="pixel-button text-xs py-2 px-4"
              >
                GUARDAR FOTOS
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
