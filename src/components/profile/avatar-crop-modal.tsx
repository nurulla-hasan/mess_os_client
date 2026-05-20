"use client";

import { useRef, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Camera, ImageIcon, RotateCcw, Save, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cn, ErrorToast, SuccessToast } from "@/lib/utils";
import { getCompressedCroppedAvatar } from "@/lib/cropImage";
import { updateAvatar } from "@/services/auth.service";

interface AvatarCropModalProps {
  triggerClassName?: string;
}

const getAvatarFileName = (fileName?: string) => {
  const baseName = fileName?.replace(/\.[^/.]+$/, "") || "profile";
  return `${baseName}.jpg`;
};

export function AvatarCropModal({ triggerClassName }: AvatarCropModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState("profile.jpg");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleTriggerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      ErrorToast("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (imageSrc) URL.revokeObjectURL(imageSrc);

    setFileName(file.name);
    setImageSrc(URL.createObjectURL(file));
    resetCrop();
    setOpen(true);
    event.target.value = "";
  };

  const resetCrop = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }
  };

  const handleConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    setIsSaving(true);
    const croppedFile = await getCompressedCroppedAvatar(imageSrc, croppedAreaPixels, {
      fileName: getAvatarFileName(fileName),
    });

    if (!croppedFile) {
      ErrorToast("Failed to crop image. Please try another photo.");
      setIsSaving(false);
      return;
    }

    const formData = new FormData();
    formData.append("avatar", croppedFile);

    const res = await updateAvatar(formData);
    if (res.success) {
      SuccessToast("Avatar updated successfully");
      handleOpenChange(false);
      window.location.reload();
    } else {
      ErrorToast(res.message);
    }

    setIsSaving(false);
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <Button
        size="icon"
        variant="secondary"
        className={cn("h-8 w-8 rounded-full shadow-lg border border-border", triggerClassName)}
        onClick={handleTriggerClick}
        loading={isSaving}
      >
        <Camera />
      </Button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="p-0 gap-0 overflow-hidden sm:max-w-xl">
          <DialogHeader className="px-6 py-4 border-b text-left gap-0">
            <DialogTitle className="text-xl font-medium flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              Crop Profile Picture
            </DialogTitle>
            <DialogDescription>
              Drag to position your photo and use zoom to frame it neatly.
            </DialogDescription>
          </DialogHeader>

          <div className="p-6 space-y-5">
            <div className="relative h-80 overflow-hidden rounded-xl border bg-muted">
              {imageSrc && (
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
                />
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ZoomIn className="h-4 w-4 text-primary" />
                  Zoom
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={resetCrop}>
                  <RotateCcw />
                  Reset
                </Button>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.05}
                onValueChange={(value) => setZoom(value[0] || 1)}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="button" loading={isSaving} loadingText="Uploading..." onClick={handleConfirm}>
              <Save />
              Save Picture
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
