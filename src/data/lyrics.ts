export interface LyricSection {
  id: string;
  title: string;
  isChorus?: boolean;
  lines: string[];
  translation?: string[];
  annotation?: string;
}

export interface SongInfo {
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  meaning: string;
  sections: LyricSection[];
}

export const songData: SongInfo = {
  title: "33x",
  artist: "Perunggu",
  album: "Memorandum",
  year: 2022,
  genre: "Indie Rock / Alternative Rock",
  meaning:
    "Judul '33x' (tiga puluh tiga kali) merujuk pada hitungan zikir/tasbih, sebuah pengingat spiritual untuk berserah diri kepada Sang Pencipta ketika menghadapi kebisingan duniawi dan krisis usia akhir dua puluhan (quarter-life crisis).",
  sections: [
    {
      id: "verse-1",
      title: "Bait 1",
      lines: [
        "Risalah terikatnya, batin dan raga yang mengunci",
        "Di atas Sang Maha Daya, semua kendali terambil alih",
        "Jikalau kau keluhkan dengung sumbang yang mengganggu",
        "Buka lagi visimu, kau tahu mana urutan satu",
      ],
      translation: [
        "A record of captivity, spirit and body locked together",
        "Before the Almighty Power, all control is taken over",
        "If you complain about the dissonant hums disrupting you",
        "Reopen your vision, you know what comes first",
      ],
    },
    {
      id: "chorus-1",
      title: "Chorus (Reff)",
      isChorus: true,
      lines: [
        "Di antara pusaran nirfungsi",
        "Petakan semua lagi, titik tuju yang t'lah terpatri",
        "Melamban bukanlah hal yang tabu",
        "Kadang itu yang kau butuh, bersandar hibahkan bebanmu",
      ],
      translation: [
        "Amidst the dysfunctional vortex",
        "Map everything again, the destination point that has been engraved",
        "Slowing down is by no means taboo",
        "Sometimes that is what you need, lean back and surrender your burdens",
      ],
      annotation:
        "Bagian chorus utama mengajak pendengar untuk melambatkan tempo hidup dan tidak merasa bersalah untuk beristirahat di tengah hiruk-pikuk kesibukan.",
    },
    {
      id: "verse-2",
      title: "Bait 2",
      lines: [
        "Rotasikan pandanganmu, ambil sudut yang terbaru",
        "Belum pernah kau coba, lihat semua bukan dari matamu",
        "Kelak kau 'kan mengingat yang membawamu ke sini",
        "Kami pernah di situ, di posisimu, helakan kesahmu",
      ],
      translation: [
        "Rotate your perspective, take the newest angle",
        "Never yet tried, see everything not merely from your own eyes",
        "Someday you will remember what brought you here",
        "We have been there, in your shoes, exhale your sigh",
      ],
    },
    {
      id: "chorus-2",
      title: "Chorus 2 (Extended Reff)",
      isChorus: true,
      lines: [
        "Di antara pusaran nirfungsi",
        "Petakan semua lagi, titik tuju yang t'lah terpatri",
        "Melamban bukanlah hal yang tabu",
        "Kadang itu yang kau butuh, bersandar hibahkan bebanmu",
        "Tak perlu kau berhenti kurasi, ini hanya sementara",
        "Bukan ujung dari rencana, jalanmu 'kan sepanjang niatmu",
        "Simpan tegar dalam hati, dua sembilan kau terus mencari",
      ],
      translation: [
        "Amidst the dysfunctional vortex",
        "Map everything again, the destination point that has been engraved",
        "Slowing down is by no means taboo",
        "Sometimes that is what you need, lean back and surrender your burdens",
        "You don't need to stop curating, this is only temporary",
        "Not the end of the plan, your path will stretch as far as your intention",
        "Keep resilience inside your heart, at twenty-nine you keep searching",
      ],
      annotation:
        "Bagian extended chorus menyertakan lirik legendaris 'dua sembilan kau terus mencari' yang menjadi anthem generasi usia 20-an akhir.",
    },
    {
      id: "outro",
      title: "Outro (Zikir / Refrain)",
      lines: [
        "Sebutlah nama-Nya, tetap di jalan-Nya",
        "Kelak kau mengingat, kau akan teringat",
        "Sebutlah nama-Nya, tetap di jalan-Nya",
        "Kelak kau mengingat, kau akan teringat",
        "Sebutlah nama-Nya, tetap di jalan-Nya",
        "Kelak kau mengingat, kau akan teringat",
        "Sebutkanlah nama-Nya, resapilah jalan-Nya",
        "Kelak kau mengingat, kau akan teringat",
        "Terus berenang, lanjutlah mendaki",
        "Terus berenang, lanjutlah mendaki",
      ],
      translation: [
        "Call upon His name, remain upon His path",
        "Someday you will remember, you will recall",
        "Call upon His name, remain upon His path",
        "Someday you will remember, you will recall",
        "Keep swimming, continue climbing",
        "Keep swimming, continue climbing",
      ],
    },
  ],
};

export const primaryChorusLines = songData.sections.find(
  (s) => s.id === "chorus-1"
)?.lines ?? [];

export const extendedChorusLines = songData.sections.find(
  (s) => s.id === "chorus-2"
)?.lines ?? [];
