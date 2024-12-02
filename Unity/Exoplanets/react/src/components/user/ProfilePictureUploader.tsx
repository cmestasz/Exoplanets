import React, { useState, useEffect } from "react";
import { useGlobals } from "@reactunity/renderer";
import { supabase } from "@lib/supabase";

const ImageUploader: React.FC = () => {
  const globals = useGlobals();
  const [imageData, setImageData] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (globals.imageData) {
      setImageData(globals.imageData);
      setUploadStatus("Imagen recibida.");
    }
  }, [globals.imageData]);

  const uploadImageToSupabase = async () => {
    if (!imageData) {
      setUploadStatus("No hay imagen para cargar.");
      return;
    }
  
    try {
      setIsLoading(true);
      setUploadStatus("Cargando imagen...");
  
      const [metadata, base64Data] = imageData.split(",");
      if (!base64Data || !metadata) {
        throw new Error("Formato equivocado.");
      }
  
      const mimeTypeMatch = metadata.match(/data:(.*?);base64/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : "application/octet-stream";
  
      const byteCharacters = atob(base64Data);
      const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });
  
      const fileExtension = mimeType.split("/")[1];
      const fileName = `image_${Date.now()}.${fileExtension}`;
  
      const { data, error } = await supabase.storage
        .from("bucketdeimagenes")
        .upload(fileName, blob, {
          cacheControl: "3600",
          upsert: false,
          contentType: mimeType,
        });
  
      if (error) {
        throw error;
      }
  
      setUploadStatus(`Imagen cargada exitosamente: ${data.path}`);
      console.log("Imagen cargada:", data);
    } catch (error: any) {
      console.error("Error al cargar la imagen:", error);
      setUploadStatus("Error al cargar la imagen: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <h1>Subir Imagen a Supabase</h1>
      {imageData && (
        <img
          src={imageData}
          alt="Vista previa"
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      )}
      <button onClick={uploadImageToSupabase} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Subir Imagen"}
      </button>
      <p>{uploadStatus}</p>
    </div>
  );
};

export default ImageUploader;
