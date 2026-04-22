/**
 * Centralized audio asset URLs.
 * All audio files are hosted on Vercel Blob Storage.
 */
export const AUDIO_URLS = {
  /** Short click/chirp used on hover interactions */
  hoverClick:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spacey%20Cricket%20Click-DlSLodgcdvrAjUskn7lVAFDf0DUxqC.wav",

  /** Sound played when opening the experience modal */
  modalOpen:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Plasma%20Blaster%20by%20BigDino1995-EoERfGPL2zXzASXAe7YgkPYneH4Dyi.wav",

  /** Ambient chirp played when sound is first enabled */
  ambientChirp:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Computer%20Chirp%202-D1CqZh4bVXk2eytmorcFbO.wav",

  /** Toggle sound played when toggling sound on/off */
  toggleClick:
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Computer%20Chirp%202-D1CqZh4bVXk20OAwebK2eytmorcFbO.wav",
} as const;
