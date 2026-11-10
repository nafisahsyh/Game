
"use strict";

/* =====================================================
   RUMAH TERAKHIR
   STORY DATABASE
===================================================== */

window.GameStory = {

    start: "prologue",

    scenes: {

        /* =============================================
           PROLOG
        ============================================= */

        prologue: {
            location: "JALAN MENUJU RUMAH",

            narration: [
                "23 November 2026. Pukul 23.47.",
                "Hujan turun sejak sore. Jalanan desa yang seharusnya ramai kini terlihat kosong.",
                "Aruna mematikan mesin mobilnya tepat di depan sebuah rumah tua yang sudah bertahun-tahun tidak dikunjungi.",
                "Rumah itu masih sama seperti yang ia ingat. Pagar besi berkarat, jendela-jendela tinggi, dan pohon beringin besar yang tumbuh di halaman depan.",
                "Sudah sebelas tahun sejak terakhir kali ia menginjakkan kaki di tempat ini.",
                "Sebelas tahun sejak ibunya menghilang.",
                "Aruna mengeluarkan sebuah amplop dari dalam tasnya. Surat itu baru diterimanya tiga hari lalu."
            ],

            dialogue: {
                character: "ARUNA",
                text: "Kenapa harus sekarang, Bu?"
            },

            options: [
                {
                    text: "Membuka surat yang diberikan kepadanya.",
                    next: "read_letter",
                    effects: {
                        addJournal: "Surat misterius dari seseorang yang mengetahui masa lalu keluarga Aruna."
                    }
                },
                {
                    text: "Langsung menuju pagar rumah.",
                    next: "front_gate",
                    effects: {
                        flags: {
                            letterRead: false
                        }
                    }
                }
            ]
        },


        /* =============================================
           MEMBACA SURAT
        ============================================= */

        read_letter: {
            location: "JALAN MENUJU RUMAH",

            narration: [
                "Aruna membuka amplop itu perlahan.",
                "Kertasnya sudah menguning. Ada aroma aneh yang keluar dari dalamnya, seperti kayu tua yang terlalu lama terendam air.",
                "Tulisan tangan di atas kertas itu tampak berantakan.",
                "\"Aruna, jika kamu membaca surat ini, berarti waktunya sudah tiba.\"",
                "\"Jangan percaya pada siapa pun yang mengatakan bahwa ibumu meninggalkan rumah ini dengan sukarela.\"",
                "\"Ada sesuatu yang belum selesai di dalam rumah itu.\"",
                "\"Dan satu hal lagi. Jangan pernah membuka kamar di ujung lorong.\""
            ],

            dialogue: {
                character: "ARUNA",
                text: "Siapa yang mengirim surat ini?"
            },

            options: [
                {
                    text: "Menyimpan surat dan menuju pagar.",
                    next: "front_gate",
                    effects: {
                        flags: {
                            letterRead: true
                        },
                        addJournal: "Isi surat: Jangan percaya bahwa ibu Aruna pergi dengan sukarela. Jangan membuka kamar di ujung lorong."
                    }
                },
                {
                    text: "Memeriksa bagian belakang surat.",
                    next: "letter_back",
                    effects: {
                        flags: {
                            letterRead: true
                        }
                    }
                }
            ]
        },


        letter_back: {
            location: "JALAN MENUJU RUMAH",

            narration: [
                "Aruna membalik kertas itu.",
                "Ada tulisan kecil di bagian paling bawah.",
                "\"Aku masih di sini.\"",
                "Di bawahnya terdapat sebuah tanggal yang ditulis dengan tinta merah.",
                "23 November 2015.",
                "Tepat sebelas tahun yang lalu."
            ],

            options: [
                {
                    text: "Menyimpan surat dan melanjutkan perjalanan.",
                    next: "front_gate",
                    effects: {
                        flags: {
                            letterRead: true,
                            foundDate: true
                        },
                        addJournal: "Di belakang surat terdapat tulisan: Aku masih di sini. Tanggalnya 23 November 2015."
                    }
                }
            ]
        },


        /* =============================================
           PAGAR DEPAN
        ============================================= */

        front_gate: {
            location: "HALAMAN DEPAN",

            narration: [
                "Pagar besi itu terkunci.",
                "Aruna mencoba mendorongnya. Engselnya mengeluarkan suara berderit panjang.",
                "Di balik pagar, halaman rumah dipenuhi rumput liar.",
                "Namun, sesuatu membuatnya berhenti.",
                "Lampu di lantai dua rumah itu menyala.",
                "Padahal rumah tersebut sudah lama tidak memiliki aliran listrik."
            ],

            options: [
                {
                    text: "Memeriksa gembok pagar.",
                    next: "inspect_gate"
                },
                {
                    text: "Memanggil seseorang dari dalam rumah.",
                    next: "call_house"
                },
                {
                    text: "Memeriksa sisi kiri halaman.",
                    next: "left_garden"
                }
            ]
        },


        inspect_gate: {
            location: "PAGAR RUMAH",

            narration: [
                "Aruna berjongkok untuk memeriksa gembok.",
                "Gembok itu terlihat tua, tetapi anehnya tidak berkarat.",
                "Ada sebuah kunci kecil tergeletak di tanah tepat di bawah pagar."
            ],

            options: [
                {
                    text: "Mengambil kunci kecil.",
                    next: "front_gate",
                    effects: {
                        addItem: "small_key",
                        addJournal: "Menemukan sebuah kunci kecil di dekat pagar rumah."
                    }
                },
                {
                    text: "Meninggalkan kunci.",
                    next: "front_gate"
                }
            ]
        },


        call_house: {
            location: "HALAMAN DEPAN",

            narration: [
                "Aruna berdiri menghadap rumah.",
                "Ia menarik napas panjang sebelum akhirnya memanggil."
            ],

            dialogue: {
                character: "ARUNA",
                text: "Permisi! Ada orang di dalam?"
            },

            options: [
                {
                    text: "Menunggu jawaban.",
                    next: "someone_answers"
                },
                {
                    text: "Berhenti memanggil dan memeriksa halaman.",
                    next: "left_garden"
                }
            ]
        },


        someone_answers: {
            location: "HALAMAN DEPAN",

            narration: [
                "Tidak ada jawaban.",
                "Aruna hampir berbalik ketika sebuah suara terdengar dari lantai dua.",
                "Suaranya sangat pelan, hampir tertelan suara hujan."
            ],

            dialogue: {
                character: "SUARA PEREMPUAN",
                text: "Aruna...?"
            },

            options: [
                {
                    text: "Menjawab suara tersebut.",
                    next: "answer_voice",
                    effects: {
                        flags: {
                            answeredVoice: true
                        }
                    }
                },
                {
                    text: "Berpura-pura tidak mendengarnya.",
                    next: "left_garden",
                    effects: {
                        flags: {
                            ignoredVoice: true
                        }
                    }
                }
            ]
        },


        answer_voice: {
            location: "HALAMAN DEPAN",

            narration: [
                "Aruna membeku.",
                "Suara itu terdengar lagi.",
                "Kali ini lebih dekat."
            ],

            dialogue: {
                character: "SUARA PEREMPUAN",
                text: "Kamu akhirnya pulang..."
            },

            options: [
                {
                    text: "Mencari sumber suara.",
                    next: "look_upstairs",
                    effects: {
                        flags: {
                            followedVoice: true
                        }
                    }
                },
                {
                    text: "Segera mencari jalan masuk.",
                    next: "left_garden"
                }
            ]
        },


        look_upstairs: {
            location: "HALAMAN DEPAN",

            narration: [
                "Aruna mendongak ke arah jendela lantai dua.",
                "Seseorang berdiri di balik tirai.",
                "Wajahnya tidak terlihat.",
                "Namun, sosok itu perlahan mengangkat tangannya dan menunjuk ke arah kamar di ujung lorong."
            ],

            options: [
                {
                    text: "Memperhatikan sosok itu lebih lama.",
                    next: "look_upstairs_again",
                    effects: {
                        flags: {
                            sawWoman: true
                        }
                    }
                },
                {
                    text: "Menjauh dari jendela.",
                    next: "left_garden"
                }
            ]
        },


        look_upstairs_again: {
            location: "HALAMAN DEPAN",

            narration: [
                "Sosok itu menghilang.",
                "Tirai jendela bergerak perlahan meskipun seluruh jendela tertutup.",
                "Aruna merasa ada seseorang yang sedang mengawasinya."
            ],

            options: [
                {
                    text: "Mencari jalan masuk ke rumah.",
                    next: "left_garden"
                }
            ]
        },


        /* =============================================
           HALAMAN SAMPING
        ============================================= */

        left_garden: {
            location: "HALAMAN SAMPING",

            narration: [
                "Aruna berjalan menyusuri sisi kiri rumah.",
                "Rumput liar menyentuh lututnya.",
                "Di sana terdapat sebuah pintu kecil yang mengarah ke dapur.",
                "Pintu itu sedikit terbuka."
            ],

            options: [
                {
                    text: "Masuk melalui pintu dapur.",
                    next: "kitchen_entry"
                },
                {
                    text: "Memeriksa sumur tua di belakang rumah.",
                    next: "old_well"
                },
                {
                    text: "Kembali ke pagar depan.",
                    next: "front_gate"
                }
            ]
        },


        old_well: {
            location: "BELAKANG RUMAH",

            narration: [
                "Sebuah sumur tua berdiri di belakang rumah.",
                "Penutup kayunya sudah lapuk.",
                "Aruna melihat sesuatu berwarna putih di dalam sumur.",
                "Sebuah kain.",
                "Kain yang sangat mirip dengan pakaian terakhir yang dikenakan ibunya."
            ],

            options: [
                {
                    text: "Mengambil kain menggunakan ranting.",
                    next: "take_cloth",
                    effects: {
                        flags: {
                            foundCloth: true
                        }
                    }
                },
                {
                    text: "Tidak menyentuhnya.",
                    next: "left_garden"
                },
                {
                    text: "Mendekat dan melihat ke dalam sumur.",
                    next: "look_well"
                }
            ]
        },


        take_cloth: {
            location: "BELAKANG RUMAH",

            narration: [
                "Aruna berhasil mengambil kain itu.",
                "Di salah satu sisinya terdapat bordiran nama.",
                "M A R I A M.",
                "Nama ibunya."
            ],

            options: [
                {
                    text: "Menyimpan kain tersebut.",
                    next: "left_garden",
                    effects: {
                        addItem: "mother_cloth",
                        addJournal: "Menemukan kain putih milik ibu Aruna dengan bordiran nama Mariam."
                    }
                }
            ]
        },


        look_well: {
            location: "BELAKANG RUMAH",

            narration: [
                "Aruna mendekat dan menunduk.",
                "Gelap sekali.",
                "Ia tidak bisa melihat dasar sumur.",
                "Namun, dari dalam sana terdengar suara seseorang sedang menangis."
            ],

            dialogue: {
                character: "SUARA DARI SUMUR",
                text: "Jangan tinggalkan aku lagi..."
            },

            options: [
                {
                    text: "Segera menjauh.",
                    next: "left_garden"
                },
                {
                    text: "Memanggil suara itu.",
                    next: "well_response",
                    effects: {
                        flags: {
                            spokeToWell: true
                        }
                    }
                }
            ]
        },


        well_response: {
            location: "BELAKANG RUMAH",

            narration: [
                "Suara tangisan itu berhenti.",
                "Beberapa detik kemudian, terdengar suara ketukan dari dalam sumur.",
                "Tiga kali.",
                "Tok. Tok. Tok."
            ],

            options: [
                {
                    text: "Meninggalkan sumur.",
                    next: "left_garden"
                }
            ]
        },


        /* =============================================
           DAPUR
        ============================================= */

        kitchen_entry: {
            location: "DAPUR",

            narration: [
                "Aruna mendorong pintu dapur.",
                "Aroma lembap langsung menyambutnya.",
                "Segala sesuatu tampak tidak tersentuh selama bertahun-tahun.",
                "Di atas meja terdapat sebuah gelas berisi air.",
                "Airnya masih terlihat jernih.",
                "Seolah-olah seseorang baru saja meletakkannya."
            ],

            options: [
                {
                    text: "Memeriksa gelas di atas meja.",
                    next: "inspect_glass"
                },
                {
                    text: "Memeriksa lemari dapur.",
                    next: "inspect_cabinet"
                },
                {
                    text: "Menuju ruang tamu.",
                    next: "living_room"
                },
                {
                    text: "Kembali ke halaman.",
                    next: "left_garden"
                }
            ]
        },


        inspect_glass: {
            location: "DAPUR",

            narration: [
                "Aruna menyentuh permukaan gelas.",
                "Airnya terasa dingin.",
                "Pada bagian luar gelas terdapat bekas sidik jari.",
                "Sidik jari itu masih basah."
            ],

            options: [
                {
                    text: "Mencium air di dalam gelas.",
                    next: "glass_smell"
                },
                {
                    text: "Meninggalkan gelas.",
                    next: "kitchen_entry"
                }
            ]
        },


        glass_smell: {
            location: "DAPUR",

            narration: [
                "Ada aroma bunga melati yang sangat samar.",
                "Aruna mengenali aroma itu.",
                "Ibunya selalu menggunakan parfum beraroma melati."
            ],

            options: [
                {
                    text: "Mengingat kembali ibunya.",
                    next: "mother_memory",
                    effects: {
                        flags: {
                            smelledMotherPerfume: true
                        },
                        addJournal: "Gelas di dapur memiliki aroma parfum melati yang biasa digunakan ibu Aruna."
                    }
                },
                {
                    text: "Kembali memeriksa dapur.",
                    next: "kitchen_entry"
                }
            ]
        },


        mother_memory: {
            location: "DAPUR",

            narration: [
                "Aruna teringat sesuatu.",
                "Dulu, setiap malam ibunya selalu menyiapkan segelas air di meja dapur.",
                "Namun, ibunya tidak pernah membiarkan siapa pun meminumnya.",
                "Katanya, air itu bukan untuk manusia."
            ],

            dialogue: {
                character: "ARUNA",
                text: "Apa sebenarnya yang Ibu sembunyikan?"
            },

            options: [
                {
                    text: "Memeriksa lemari dapur.",
                    next: "inspect_cabinet"
                },
                {
                    text: "Menuju ruang tamu.",
                    next: "living_room"
                }
            ]
        },


        inspect_cabinet: {
            location: "DAPUR",

            narration: [
                "Aruna membuka lemari dapur.",
                "Di dalamnya terdapat beberapa piring tua dan sebuah kotak kayu kecil.",
                "Kotak tersebut memiliki lubang kunci."
            ],

            options: [
                {
                    text: "Mencoba membuka kotak.",
                    next: "open_wooden_box",
                    condition: {
                        hasItem: "small_key"
                    }
                },
                {
                    text: "Menyimpan kotak dan memeriksa ruangan lain.",
                    next: "kitchen_entry"
                }
            ]
        },


        open_wooden_box: {
            location: "DAPUR",

            narration: [
                "Kunci kecil itu ternyata cocok.",
                "Di dalam kotak terdapat sebuah foto keluarga.",
                "Aruna mengenali dirinya sendiri dalam foto tersebut.",
                "Namun, ada satu hal yang membuatnya terdiam.",
                "Dalam foto itu, ibunya berdiri bersama dua orang anak perempuan.",
                "Aruna hanya memiliki satu saudara perempuan.",
                "Siapa anak yang satunya lagi?"
            ],

            options: [
                {
                    text: "Mengambil foto keluarga.",
                    next: "kitchen_entry",
                    effects: {
                        addItem: "family_photo",
                        addJournal: "Foto keluarga menunjukkan dua anak perempuan, padahal Aruna hanya mengenal satu saudara perempuan."
                    }
                },
                {
                    text: "Memperhatikan bagian belakang foto.",
                    next: "photo_back"
                }
            ]
        },


        photo_back: {
            location: "DAPUR",

            narration: [
                "Di belakang foto terdapat tulisan tangan ibunya.",
                "\"Jangan biarkan dia tahu bahwa aku masih mengingatnya.\"",
                "Tidak ada nama.",
                "Tidak ada tanggal."
            ],

            options: [
                {
                    text: "Mengambil foto.",
                    next: "kitchen_entry",
                    effects: {
                        addItem: "family_photo",
                        addJournal: "Tulisan di belakang foto: Jangan biarkan dia tahu bahwa aku masih mengingatnya."
                    }
                }
            ]
        },


        /* =============================================
           RUANG TAMU
        ============================================= */

        living_room: {
            location: "RUANG TAMU",

            narration: [
                "Ruang tamu terlihat jauh lebih besar daripada yang Aruna ingat.",
                "Sofa tua masih berada di tempat yang sama.",
                "Sebuah jam dinding berhenti tepat pada pukul 02.13.",
                "Di atas meja terdapat buku harian dengan sampul berwarna cokelat.",
                "Ada pula sebuah foto besar keluarga yang tergantung di dinding."
            ],

            options: [
                {
                    text: "Memeriksa buku harian.",
                    next: "inspect_diary"
                },
                {
                    text: "Melihat foto keluarga di dinding.",
                    next: "inspect_wall_photo"
                },
                {
                    text: "Memeriksa jam dinding.",
                    next: "inspect_clock"
                },
                {
                    text: "Naik ke lantai dua.",
                    next: "upstairs"
                },
                {
                    text: "Kembali ke dapur.",
                    next: "kitchen_entry"
                }
            ]
        },


        inspect_diary: {
            location: "RUANG TAMU",

            narration: [
                "Aruna membuka buku harian itu.",
                "Sebagian besar halamannya kosong.",
                "Namun, pada salah satu halaman terdapat tulisan yang dibuat dengan sangat tergesa-gesa.",
                "\"Dia kembali lagi malam ini.\"",
                "\"Aku sudah mencoba menguncinya.\"",
                "\"Tapi pintu itu selalu terbuka sendiri.\"",
                "\"Aku tidak tahu berapa lama lagi bisa bertahan.\""
            ],

            options: [
                {
                    text: "Membaca halaman berikutnya.",
                    next: "diary_next",
                    effects: {
                        addJournal: "Catatan harian: Seseorang atau sesuatu selalu kembali setiap malam. Pintu yang dikunci selalu terbuka sendiri."
                    }
                },
                {
                    text: "Menutup buku harian.",
                    next: "living_room"
                }
            ]
        },


        diary_next: {
            location: "RUANG TAMU",

            narration: [
                "Halaman berikutnya memiliki tulisan yang berbeda.",
                "Tulisan itu tampak jauh lebih rapi.",
                "\"Aruna tidak boleh tahu.\"",
                "\"Jika dia mengetahui semuanya, rumah ini tidak akan pernah melepaskan kami.\"",
                "Tiba-tiba, terdengar suara langkah kaki dari lantai dua."
            ],

            options: [
                {
                    text: "Memanggil siapa pun yang berada di atas.",
                    next: "call_upstairs"
                },
                {
                    text: "Menyimpan buku harian.",
                    next: "living_room",
                    effects: {
                        addItem: "old_diary"
                    }
                }
            ]
        },


        call_upstairs: {
            location: "RUANG TAMU",

            dialogue: {
                character: "ARUNA",
                text: "Siapa di atas?"
            },

            narration: [
                "Tidak ada jawaban.",
                "Suara langkah kaki berhenti tepat di atas kepala Aruna.",
                "Lalu terdengar suara benda berat diseret melintasi lantai."
            ],

            options: [
                {
                    text: "Naik ke lantai dua.",
                    next: "upstairs",
                    effects: {
                        flags: {
                            heardUpstairs: true
                        }
                    }
                },
                {
                    text: "Bersembunyi di balik sofa.",
                    next: "hide_sofa",
                    effects: {
                        flags: {
                            hidFromSomething: true
                        }
                    }
                }
            ]
        },


        hide_sofa: {
            location: "RUANG TAMU",

            narration: [
                "Aruna bersembunyi di balik sofa.",
                "Dari celah kecil, ia melihat sepasang kaki berdiri di dekat tangga.",
                "Kaki itu tidak bergerak.",
                "Lalu perlahan, sosok tersebut menunduk.",
                "Seseorang sedang melihat ke bawah sofa."
            ],

            options: [
                {
                    text: "Tetap diam.",
                    next: "hide_sofa_wait"
                },
                {
                    text: "Keluar dan berlari ke dapur.",
                    next: "kitchen_entry"
                }
            ]
        },


        hide_sofa_wait: {
            location: "RUANG TAMU",

            narration: [
                "Aruna menahan napas.",
                "Sosok itu berdiri cukup lama.",
                "Kemudian ia berbalik dan berjalan menuju tangga.",
                "Sebelum menghilang, sebuah suara berbisik."
            ],

            dialogue: {
                character: "SUARA PEREMPUAN",
                text: "Kamu mirip sekali dengannya..."
            },

            options: [
                {
                    text: "Keluar dari persembunyian.",
                    next: "living_room"
                },
                {
                    text: "Mengikuti sosok tersebut.",
                    next: "upstairs"
                }
            ]
        },


        inspect_wall_photo: {
            location: "RUANG TAMU",

            narration: [
                "Aruna mendekati foto keluarga.",
                "Ada empat orang di dalam foto.",
                "Ayahnya, ibunya, dirinya, dan seorang perempuan yang wajahnya dicoret dengan tinta hitam.",
                "Pada bingkai foto terdapat goresan kecil."
            ],

            dialogue: {
                character: "ARUNA",
                text: "Siapa sebenarnya kamu?"
            },

            options: [
                {
                    text: "Menyentuh bagian wajah yang dicoret.",
                    next: "photo_touch",
                    effects: {
                        flags: {
                            touchedPortrait: true
                        }
                    }
                },
                {
                    text: "Meninggalkan foto.",
                    next: "living_room"
                }
            ]
        },


        photo_touch: {
            location: "RUANG TAMU",

            narration: [
                "Ketika jari Aruna menyentuh foto, lampu di ruang tamu berkedip.",
                "Selama sepersekian detik, wajah perempuan yang dicoret itu terlihat jelas.",
                "Wajahnya sangat mirip dengan Aruna."
            ],

            options: [
                {
                    text: "Memeriksa bagian belakang bingkai.",
                    next: "photo_frame_back"
                },
                {
                    text: "Menjauh dari foto.",
                    next: "living_room"
                }
            ]
        },


        photo_frame_back: {
            location: "RUANG TAMU",

            narration: [
                "Di belakang bingkai terdapat tulisan kecil.",
                "\"Mariam, Laras, Aruna.\"",
                "Tiga nama.",
                "Aruna hanya mengenal dua di antaranya."
            ],

            options: [
                {
                    text: "Mencatat ketiga nama tersebut.",
                    next: "living_room",
                    effects: {
                        flags: {
                            knowsLarasName: true
                        },
                        addJournal: "Di balik bingkai foto ditemukan tiga nama: Mariam, Laras, dan Aruna."
                    }
                }
            ]
        },


        inspect_clock: {
            location: "RUANG TAMU",

            narration: [
                "Aruna mendekati jam dinding.",
                "Jarumnya berhenti tepat pukul 02.13.",
                "Ada sesuatu yang tertulis pada bagian belakang jam."
            ],

            options: [
                {
                    text: "Membuka penutup jam.",
                    next: "clock_back"
                },
                {
                    text: "Meninggalkan jam.",
                    next: "living_room"
                }
            ]
        },


        clock_back: {
            location: "RUANG TAMU",

            narration: [
                "Di balik penutup jam terdapat selembar kertas kecil.",
                "\"Ketika jam berhenti, jangan mencari siapa yang datang.\"",
                "\"Carilah siapa yang belum pergi.\""
            ],

            options: [
                {
                    text: "Menyimpan pesan tersebut.",
                    next: "living_room",
                    effects: {
                        addJournal: "Pesan di belakang jam: Ketika jam berhenti, jangan mencari siapa yang datang. Carilah siapa yang belum pergi."
                    }
                }
            ]
        },


        /* =============================================
           LANTAI DUA
        ============================================= */

        upstairs: {
            location: "LORONG LANTAI DUA",

            narration: [
                "Tangga kayu berderit setiap kali Aruna melangkah.",
                "Di lantai dua terdapat tiga pintu.",
                "Pintu pertama menuju kamar lamanya.",
                "Pintu kedua menuju kamar orang tuanya.",
                "Pintu ketiga berada di ujung lorong.",
                "Pintu itu berbeda dari yang lain.",
                "Ada rantai besi melilit gagangnya."
            ],

            options: [
                {
                    text: "Memasuki kamar lama Aruna.",
                    next: "aruna_bedroom"
                },
                {
                    text: "Memasuki kamar orang tua.",
                    next: "parents_bedroom"
                },
                {
                    text: "Memeriksa pintu berantai.",
                    next: "locked_room"
                },
                {
                    text: "Kembali ke ruang tamu.",
                    next: "living_room"
                }
            ]
        },


        aruna_bedroom: {
            location: "KAMAR ARUNA",

            narration: [
                "Kamar itu masih dipenuhi barang-barang masa kecil Aruna.",
                "Boneka beruang di atas tempat tidur terlihat sama seperti sebelas tahun lalu.",
                "Di meja belajar terdapat sebuah kotak musik kecil.",
                "Aruna pernah memiliki kotak musik seperti itu."
            ],

            options: [
                {
                    text: "Memeriksa boneka beruang.",
                    next: "inspect_teddy"
                },
                {
                    text: "Membuka kotak musik.",
                    next: "music_box"
                },
                {
                    text: "Memeriksa laci meja.",
                    next: "bedroom_drawer"
                },
                {
                    text: "Keluar dari kamar.",
                    next: "upstairs"
                }
            ]
        },


        inspect_teddy: {
            location: "KAMAR ARUNA",

            narration: [
                "Aruna mengambil boneka itu.",
                "Ada bekas jahitan pada bagian punggungnya.",
                "Seolah-olah seseorang pernah membuka bagian dalam boneka tersebut."
            ],

            options: [
                {
                    text: "Memeriksa bagian jahitan.",
                    next: "teddy_inside"
                },
                {
                    text: "Meletakkan boneka kembali.",
                    next: "aruna_bedroom"
                }
            ]
        },


        teddy_inside: {
            location: "KAMAR ARUNA",

            narration: [
                "Aruna menemukan selembar kertas kecil di dalam boneka.",
                "Tulisan di atasnya dibuat dengan krayon.",
                "\"Kak Laras, jangan pergi lagi.\"",
                "Tulisan itu tampak seperti tulisan tangan anak kecil."
            ],

            options: [
                {
                    text: "Menyimpan kertas.",
                    next: "aruna_bedroom",
                    effects: {
                        flags: {
                            foundLarasNote: true
                        },
                        addJournal: "Kertas dari dalam boneka bertuliskan: Kak Laras, jangan pergi lagi."
                    }
                }
            ]
        },


        music_box: {
            location: "KAMAR ARUNA",

            narration: [
                "Aruna membuka kotak musik.",
                "Di dalamnya terdapat sebuah foto kecil.",
                "Foto seorang anak perempuan yang sedang tersenyum.",
                "Di bagian belakangnya tertulis nama Laras."
            ],

            options: [
                {
                    text: "Mengambil foto kecil.",
                    next: "aruna_bedroom",
                    effects: {
                        addItem: "laras_photo",
                        addJournal: "Menemukan foto seorang anak perempuan bernama Laras di dalam kotak musik."
                    }
                }
            ]
        },


        bedroom_drawer: {
            location: "KAMAR ARUNA",

            narration: [
                "Di dalam laci terdapat sebuah buku gambar.",
                "Sebagian besar halamannya berisi gambar rumah.",
                "Namun, pada halaman terakhir terdapat gambar tiga orang perempuan.",
                "Satu berdiri di depan rumah.",
                "Satu berada di balik jendela.",
                "Satu lagi digambar di bawah tanah."
            ],

            options: [
                {
                    text: "Menyimpan buku gambar.",
                    next: "aruna_bedroom",
                    effects: {
                        addItem: "drawing_book",
                        addJournal: "Buku gambar Aruna memperlihatkan tiga perempuan dengan posisi yang tidak biasa."
                    }
                }
            ]
        },


        /* =============================================
           KAMAR ORANG TUA
        ============================================= */

        parents_bedroom: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Kamar orang tuanya terasa sangat dingin.",
                "Tempat tidur masih tertata rapi.",
                "Di atas meja terdapat sebuah cermin tua yang ditutupi kain.",
                "Lemari pakaian sedikit terbuka.",
                "Aruna melihat sebuah laci terkunci."
            ],

            options: [
                {
                    text: "Memeriksa cermin.",
                    next: "inspect_mirror"
                },
                {
                    text: "Memeriksa lemari pakaian.",
                    next: "inspect_wardrobe"
                },
                {
                    text: "Membuka laci terkunci.",
                    next: "parents_drawer",
                    condition: {
                        hasItem: "small_key"
                    }
                },
                {
                    text: "Keluar dari kamar.",
                    next: "upstairs"
                }
            ]
        },


        inspect_mirror: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Aruna menarik kain penutup cermin.",
                "Pantulannya terlihat normal.",
                "Namun, ada sesuatu yang berbeda.",
                "Di belakang pantulan Aruna, seseorang sedang berdiri.",
                "Aruna berbalik.",
                "Tidak ada siapa pun."
            ],

            options: [
                {
                    text: "Melihat kembali ke cermin.",
                    next: "mirror_again",
                    effects: {
                        flags: {
                            sawMirrorFigure: true
                        }
                    }
                },
                {
                    text: "Menutup cermin.",
                    next: "parents_bedroom"
                }
            ]
        },


        mirror_again: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Kali ini sosok itu terlihat lebih jelas.",
                "Seorang perempuan dengan rambut panjang.",
                "Ia berdiri sangat dekat di belakang Aruna.",
                "Perempuan itu mengangkat satu jari ke bibirnya.",
                "Kemudian bibirnya bergerak."
            ],

            dialogue: {
                character: "SOSOK DALAM CERMIN",
                text: "Jangan bangunkan dia."
            },

            options: [
                {
                    text: "Menutup cermin dengan kain.",
                    next: "parents_bedroom",
                    effects: {
                        flags: {
                            mirrorWarning: true
                        }
                    }
                },
                {
                    text: "Menyentuh permukaan cermin.",
                    next: "mirror_touch",
                    effects: {
                        flags: {
                            touchedMirror: true
                        }
                    }
                }
            ]
        },


        mirror_touch: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Permukaan cermin terasa hangat.",
                "Tiba-tiba sebuah tangan muncul dari dalam pantulan.",
                "Jari-jarinya mencengkeram pergelangan tangan Aruna.",
                "Aruna menarik tangannya dengan cepat.",
                "Di permukaan cermin tertinggal sebuah tulisan."
            ],

            dialogue: {
                character: "TULISAN DI CERMIN",
                text: "Dia bukan anak pertama."
            },

            options: [
                {
                    text: "Meninggalkan kamar.",
                    next: "upstairs",
                    effects: {
                        flags: {
                            mirrorSecret: true
                        },
                        addJournal: "Tulisan misterius di cermin: Dia bukan anak pertama."
                    }
                }
            ]
        },


        inspect_wardrobe: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Aruna membuka lemari pakaian.",
                "Di bagian paling bawah terdapat sebuah koper tua.",
                "Koper itu memiliki beberapa bercak tanah."
            ],

            options: [
                {
                    text: "Membuka koper.",
                    next: "open_suitcase"
                },
                {
                    text: "Menutup lemari.",
                    next: "parents_bedroom"
                }
            ]
        },


        open_suitcase: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Di dalam koper terdapat pakaian anak-anak, beberapa surat, dan sebuah gelang perak.",
                "Pada gelang itu terukir satu nama.",
                "LARAS."
            ],

            options: [
                {
                    text: "Mengambil gelang.",
                    next: "parents_bedroom",
                    effects: {
                        addItem: "silver_bracelet",
                        addJournal: "Menemukan gelang perak bertuliskan nama Laras."
                    }
                }
            ]
        },


        parents_drawer: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Laci berhasil dibuka.",
                "Di dalamnya terdapat beberapa dokumen lama.",
                "Satu lembar surat terlihat lebih baru daripada dokumen lainnya.",
                "Surat itu ditulis oleh ibunya."
            ],

            options: [
                {
                    text: "Membaca surat.",
                    next: "mother_letter"
                },
                {
                    text: "Menyimpan seluruh dokumen.",
                    next: "parents_bedroom",
                    effects: {
                        addItem: "old_documents"
                    }
                }
            ]
        },


        mother_letter: {
            location: "KAMAR ORANG TUA",

            narration: [
                "\"Aku sudah tidak sanggup lagi membedakan mana yang nyata dan mana yang hanya tinggal dalam ingatanku.\"",
                "\"Laras masih ada di sini.\"",
                "\"Aku melihatnya setiap malam.\"",
                "\"Tetapi Aruna selalu mengatakan bahwa Laras sudah meninggal.\"",
                "\"Aku tidak tahu siapa yang sebenarnya berbohong.\""
            ],

            options: [
                {
                    text: "Menyimpan surat ibu.",
                    next: "parents_bedroom",
                    effects: {
                        addItem: "mother_letter",
                        addJournal: "Surat ibu menyebut Laras masih berada di rumah, meskipun Aruna mengingat bahwa Laras telah meninggal."
                    }
                }
            ]
        },


        /* =============================================
           KAMAR DI UJUNG LORONG
        ============================================= */

        locked_room: {
            location: "UJUNG LORONG",

            narration: [
                "Aruna berdiri di depan pintu ketiga.",
                "Rantai besi melilit gagangnya.",
                "Ada bekas goresan pada kayu pintu.",
                "Goresan itu terlihat seperti bekas kuku.",
                "Di antara celah pintu, terdengar suara seseorang bernapas."
            ],

            options: [
                {
                    text: "Menempelkan telinga ke pintu.",
                    next: "listen_door"
                },
                {
                    text: "Memeriksa rantai besi.",
                    next: "inspect_chain"
                },
                {
                    text: "Mencoba membuka pintu dengan paksa.",
                    next: "force_door",
                    effects: {
                        flags: {
                            forcedDoor: true
                        }
                    }
                },
                {
                    text: "Meninggalkan pintu.",
                    next: "upstairs"
                }
            ]
        },


        listen_door: {
            location: "UJUNG LORONG",

            narration: [
                "Aruna menempelkan telinganya.",
                "Awalnya hanya terdengar suara napas.",
                "Kemudian suara itu berubah menjadi bisikan.",
                "Sangat pelan.",
                "Sangat dekat."
            ],

            dialogue: {
                character: "SUARA DARI BALIK PINTU",
                text: "Aruna... jangan tinggalkan aku lagi."
            },

            options: [
                {
                    text: "Menjawab suara tersebut.",
                    next: "door_conversation",
                    effects: {
                        flags: {
                            spokeToLockedRoom: true
                        }
                    }
                },
                {
                    text: "Menjauh dari pintu.",
                    next: "upstairs"
                }
            ]
        },


        door_conversation: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "SUARA DARI BALIK PINTU",
                text: "Kamu masih ingat aku, kan?"
            },

            narration: [
                "Aruna tidak mampu menjawab.",
                "Ada sesuatu pada suara itu yang membuatnya ingin menangis.",
                "Suara tersebut terdengar sangat familiar."
            ],

            options: [
                {
                    text: "Bertanya siapa dirinya.",
                    next: "ask_identity"
                },
                {
                    text: "Bertanya tentang ibu.",
                    next: "ask_mother"
                },
                {
                    text: "Mengakhiri percakapan.",
                    next: "upstairs"
                }
            ]
        },


        ask_identity: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "SUARA DARI BALIK PINTU",
                text: "Aku kakakmu, Aruna."
            },

            narration: [
                "Jantung Aruna berdegup lebih cepat.",
                "Ia tidak pernah memiliki kakak.",
                "Setidaknya, itulah yang selama ini dipercayainya."
            ],

            options: [
                {
                    text: "Bertanya tentang nama Laras.",
                    next: "ask_laras"
                },
                {
                    text: "Tidak mempercayai suara itu.",
                    next: "upstairs"
                }
            ]
        },


        ask_laras: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "SUARA DARI BALIK PINTU",
                text: "Jadi, kamu akhirnya menemukan namaku."
            },

            narration: [
                "Sesuatu bergerak di balik pintu.",
                "Rantai besi bergetar.",
                "Kemudian terdengar suara tawa kecil."
            ],

            options: [
                {
                    text: "Meminta Laras menceritakan semuanya.",
                    next: "laras_story",
                    effects: {
                        flags: {
                            knowsLarasIdentity: true
                        }
                    }
                },
                {
                    text: "Pergi mencari bukti lain.",
                    next: "upstairs"
                }
            ]
        },


        ask_mother: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "SUARA DARI BALIK PINTU",
                text: "Ibu tidak pernah meninggalkanku."
            },

            narration: [
                "Suara itu berubah menjadi tangisan.",
                "Seseorang mengetuk pintu dari dalam.",
                "Sekali.",
                "Dua kali.",
                "Tiga kali."
            ],

            options: [
                {
                    text: "Menanyakan keberadaan ibu.",
                    next: "mother_location"
                },
                {
                    text: "Pergi dari lorong.",
                    next: "upstairs"
                }
            ]
        },


        mother_location: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "SUARA DARI BALIK PINTU",
                text: "Di tempat yang sama denganku."
            },

            narration: [
                "Aruna mundur beberapa langkah.",
                "Ada suara benda jatuh dari dalam kamar.",
                "Kemudian semuanya menjadi sunyi."
            ],

            options: [
                {
                    text: "Mencari petunjuk lain.",
                    next: "upstairs"
                }
            ]
        },


        laras_story: {
            location: "UJUNG LORONG",

            narration: [
                "Suara dari balik pintu mulai bercerita.",
                "\"Dulu kita bertiga tinggal di sini.\"",
                "\"Ibu, aku, dan kamu.\"",
                "\"Tapi suatu malam, Ibu menyuruhku bersembunyi.\"",
                "\"Katanya, apa pun yang terjadi, jangan keluar sebelum semuanya selesai.\"",
                "\"Aku menunggunya.\"",
                "\"Sampai aku tidak tahu lagi berapa lama waktu berlalu.\""
            ],

            dialogue: {
                character: "LARAS",
                text: "Kamu tahu apa yang terjadi padaku malam itu?"
            },

            options: [
                {
                    text: "Mengatakan bahwa Aruna tidak ingat.",
                    next: "laras_no_memory"
                },
                {
                    text: "Mengatakan bahwa Aruna akan mencari tahu.",
                    next: "laras_search"
                }
            ]
        },


        laras_no_memory: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "LARAS",
                text: "Tidak apa-apa. Ibu juga selalu mengatakan begitu."
            },

            narration: [
                "Suara itu terdengar semakin jauh.",
                "Untuk sesaat, Aruna merasa seseorang sedang berdiri tepat di belakangnya."
            ],

            options: [
                {
                    text: "Berbalik.",
                    next: "turn_around"
                },
                {
                    text: "Tetap menghadap pintu.",
                    next: "upstairs"
                }
            ]
        },


        turn_around: {
            location: "UJUNG LORONG",

            narration: [
                "Tidak ada siapa pun.",
                "Namun, di lantai terdapat jejak kaki basah.",
                "Jejak itu bermula dari pintu kamar dan berhenti tepat di belakang Aruna."
            ],

            options: [
                {
                    text: "Mengikuti jejak kaki.",
                    next: "follow_footprints",
                    effects: {
                        flags: {
                            followedFootprints: true
                        }
                    }
                },
                {
                    text: "Kembali ke tangga.",
                    next: "upstairs"
                }
            ]
        },


        follow_footprints: {
            location: "LORONG LANTAI DUA",

            narration: [
                "Jejak kaki itu mengarah ke kamar orang tua.",
                "Pintu kamar yang sebelumnya tertutup kini terbuka sedikit.",
                "Dari dalam terdengar suara perempuan sedang menyanyikan lagu pengantar tidur."
            ],

            options: [
                {
                    text: "Masuk ke kamar orang tua.",
                    next: "parents_bedroom"
                }
            ]
        },


        laras_search: {
            location: "UJUNG LORONG",

            narration: [
                "Laras tidak langsung menjawab.",
                "Beberapa detik kemudian, suara itu terdengar lagi.",
                "\"Kalau begitu, cari buku yang disimpan Ibu.\"",
                "\"Jangan percaya pada halaman terakhirnya.\""
            ],

            options: [
                {
                    text: "Menanyakan letak buku.",
                    next: "laras_book_hint"
                },
                {
                    text: "Meninggalkan pintu.",
                    next: "upstairs"
                }
            ]
        },


        laras_book_hint: {
            location: "UJUNG LORONG",

            dialogue: {
                character: "LARAS",
                text: "Di bawah tempat tidur Ibu."
            },

            narration: [
                "Setelah mengatakan itu, suara Laras menghilang.",
                "Rantai besi kembali diam."
            ],

            options: [
                {
                    text: "Mencari buku di kamar orang tua.",
                    next: "parents_bedroom",
                    effects: {
                        flags: {
                            knowsBookLocation: true
                        },
                        addJournal: "Laras mengatakan bahwa ada sebuah buku yang disimpan di bawah tempat tidur ibu."
                    }
                }
            ]
        },


        force_door: {
            location: "UJUNG LORONG",

            narration: [
                "Aruna menarik rantai besi sekuat tenaga.",
                "Pintu tidak bergerak.",
                "Namun, dari dalam terdengar suara benda berat jatuh.",
                "Kemudian suara ketukan terdengar semakin keras."
            ],

            options: [
                {
                    text: "Berhenti mencoba membuka pintu.",
                    next: "upstairs"
                },
                {
                    text: "Mencoba sekali lagi.",
                    next: "door_warning"
                }
            ]
        },


        door_warning: {
            location: "UJUNG LORONG",

            narration: [
                "Sebuah suara perempuan tiba-tiba terdengar sangat dekat.",
                "\"Kalau kamu membukanya, jangan salahkan aku.\"",
                "Tepat setelah itu, pintu bergerak sedikit.",
                "Seseorang sedang mendorongnya dari dalam."
            ],

            options: [
                {
                    text: "Meninggalkan pintu.",
                    next: "upstairs"
                }
            ]
        },


        /* =============================================
           BUKU TERSEMBUNYI
        ============================================= */

        hidden_book: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Aruna menemukan sebuah buku tebal di bawah tempat tidur.",
                "Sampulnya tidak memiliki judul.",
                "Hanya ada tulisan tangan di halaman pertama.",
                "\"Untuk anak yang masih tersisa.\""
            ],

            options: [
                {
                    text: "Membuka halaman pertama.",
                    next: "book_page_one"
                },
                {
                    text: "Membaca halaman terakhir.",
                    next: "book_last_page"
                },
                {
                    text: "Menyimpan buku.",
                    next: "parents_bedroom",
                    effects: {
                        addItem: "hidden_book"
                    }
                }
            ]
        },


        book_page_one: {
            location: "KAMAR ORANG TUA",

            narration: [
                "\"Laras lahir pada tahun 2001.\"",
                "\"Aruna lahir pada tahun 2003.\"",
                "\"Mereka adalah dua anak perempuan yang paling kusayangi.\"",
                "\"Namun, tidak semua orang dapat melihat mereka berdua.\"",
                "\"Dan tidak semua orang seharusnya mengingat.\""
            ],

            options: [
                {
                    text: "Membaca halaman berikutnya.",
                    next: "book_middle"
                },
                {
                    text: "Menutup buku.",
                    next: "parents_bedroom"
                }
            ]
        },


        book_middle: {
            location: "KAMAR ORANG TUA",

            narration: [
                "\"Pada malam tanggal 23 November 2015, semuanya berubah.\"",
                "\"Aku mendengar suara dari kamar Laras.\"",
                "\"Ketika kubuka pintunya, aku hanya menemukan Aruna.\"",
                "\"Laras tidak ada.\"",
                "\"Tetapi Aruna terus mengatakan bahwa kakaknya sedang tidur.\""
            ],

            options: [
                {
                    text: "Membaca halaman terakhir.",
                    next: "book_last_page"
                },
                {
                    text: "Menutup buku dan berpikir.",
                    next: "parents_bedroom",
                    effects: {
                        flags: {
                            learnedBookSecret: true
                        },
                        addJournal: "Catatan ibu menyebut bahwa Laras menghilang pada 23 November 2015. Aruna terus mengatakan kakaknya sedang tidur."
                    }
                }
            ]
        },


        book_last_page: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Aruna membuka halaman terakhir.",
                "Halaman itu terlihat kosong.",
                "Namun, perlahan tinta hitam muncul di permukaannya.",
                "\"Jangan biarkan Aruna mengingat malam itu.\"",
                "\"Dia yang membuka pintunya.\"",
                "\"Dia yang membiarkan Laras keluar.\""
            ],

            dialogue: {
                character: "ARUNA",
                text: "Apa yang sebenarnya kulakukan?"
            },

            options: [
                {
                    text: "Menerima bahwa mungkin dirinya terlibat.",
                    next: "accept_memory",
                    effects: {
                        flags: {
                            acceptedGuilt: true
                        }
                    }
                },
                {
                    text: "Menganggap tulisan itu kebohongan.",
                    next: "reject_memory",
                    effects: {
                        flags: {
                            rejectedGuilt: true
                        }
                    }
                },
                {
                    text: "Mencari penjelasan dari Laras.",
                    next: "locked_room",
                    effects: {
                        flags: {
                            seeksLarasTruth: true
                        }
                    }
                }
            ]
        },


        accept_memory: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Sebuah ingatan muncul.",
                "Aruna kecil berdiri di depan pintu kamar.",
                "Laras menangis dari dalam.",
                "Tangan kecil Aruna memegang kunci.",
                "Kemudian terdengar suara ibunya berteriak."
            ],

            dialogue: {
                character: "ARUNA",
                text: "Aku... ingat."
            },

            options: [
                {
                    text: "Mencari tahu apa yang terjadi setelah pintu terbuka.",
                    next: "final_truth",
                    effects: {
                        flags: {
                            remembersThatNight: true
                        }
                    }
                }
            ]
        },


        reject_memory: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Aruna menutup buku itu dengan kasar.",
                "Ia tidak percaya.",
                "Tidak mungkin ia melakukan sesuatu kepada kakaknya sendiri.",
                "Namun, ada satu hal yang tidak bisa ia bantah.",
                "Ia tidak pernah benar-benar mengingat bagaimana Laras meninggal."
            ],

            options: [
                {
                    text: "Mencari Laras.",
                    next: "locked_room"
                },
                {
                    text: "Mencari dokumen keluarga.",
                    next: "parents_bedroom"
                }
            ]
        },


        /* =============================================
           KEBENARAN
        ============================================= */

        final_truth: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Ingatan itu kembali sedikit demi sedikit.",
                "Malam itu, Aruna kecil mendengar suara Laras meminta tolong.",
                "Ia membuka pintu kamar.",
                "Namun, bukan Laras yang keluar.",
                "Sosok perempuan lain berdiri di balik pintu.",
                "Ibunya berusaha menutup kembali pintu tersebut.",
                "Kemudian semuanya menjadi gelap.",
                "Sejak malam itu, Laras tidak pernah terlihat lagi."
            ],

            dialogue: {
                character: "ARUNA",
                text: "Jadi selama ini... siapa yang tinggal di kamar itu?"
            },

            options: [
                {
                    text: "Menghadapi Laras.",
                    next: "final_room",
                    effects: {
                        flags: {
                            confrontsLaras: true
                        }
                    }
                },
                {
                    text: "Mencari ibu terlebih dahulu.",
                    next: "find_mother",
                    effects: {
                        flags: {
                            seeksMother: true
                        }
                    }
                },
                {
                    text: "Meninggalkan rumah.",
                    next: "ending_escape"
                }
            ]
        },


        final_room: {
            location: "UJUNG LORONG",

            narration: [
                "Rantai besi yang melilit pintu terjatuh dengan sendirinya.",
                "Pintu terbuka perlahan.",
                "Di dalam kamar terdapat sebuah kursi kayu.",
                "Seorang perempuan duduk membelakangi pintu.",
                "Rambutnya panjang.",
                "Di sampingnya terdapat sebuah boneka beruang."
            ],

            dialogue: {
                character: "PEREMPUAN",
                text: "Akhirnya kamu mengingatku."
            },

            options: [
                {
                    text: "Mendekati perempuan itu.",
                    next: "ending_truth"
                },
                {
                    text: "Meminta perempuan itu menunjukkan wajahnya.",
                    next: "ending_face"
                },
                {
                    text: "Menutup pintu dan pergi.",
                    next: "ending_escape"
                }
            ]
        },


        find_mother: {
            location: "KAMAR ORANG TUA",

            narration: [
                "Aruna memeriksa kamar sekali lagi.",
                "Di bawah tempat tidur terdapat sebuah pintu kecil yang hampir tidak terlihat.",
                "Pintu itu mengarah ke ruang penyimpanan di bawah rumah.",
                "Dari sana terdengar suara ibunya."
            ],

            dialogue: {
                character: "SUARA IBU",
                text: "Aruna... jangan masuk."
            },

            options: [
                {
                    text: "Membuka pintu ruang penyimpanan.",
                    next: "basement"
                },
                {
                    text: "Meninggalkan kamar.",
                    next: "upstairs"
                }
            ]
        },


        basement: {
            location: "RUANG BAWAH TANAH",

            narration: [
                "Tangga sempit membawa Aruna ke ruang bawah tanah.",
                "Ruangan itu dipenuhi kotak-kotak tua.",
                "Di ujung ruangan terdapat sebuah kursi.",
                "Seorang perempuan duduk di sana.",
                "Rambutnya telah memutih.",
                "Wajahnya sangat mirip dengan seseorang yang selama ini hanya Aruna lihat dalam foto."
            ],

            dialogue: {
                character: "PEREMPUAN",
                text: "Kamu datang juga, Nak."
            },

            options: [
                {
                    text: "Mendekati perempuan tersebut.",
                    next: "ending_mother"
                },
                {
                    text: "Bertanya tentang Laras.",
                    next: "mother_laras"
                },
                {
                    text: "Keluar dari ruang bawah tanah.",
                    next: "ending_escape"
                }
            ]
        },


        mother_laras: {
            location: "RUANG BAWAH TANAH",

            dialogue: {
                character: "IBU",
                text: "Jangan panggil namanya. Dia akan mendengarmu."
            },

            narration: [
                "Ibu Aruna menangis.",
                "Ia mengatakan bahwa selama sebelas tahun terakhir, dirinya tidak pernah benar-benar meninggalkan rumah.",
                "Ia menunggu kedua anaknya kembali.",
                "Namun, Aruna tidak tahu apakah perempuan di hadapannya benar-benar ibunya."
            ],

            options: [
                {
                    text: "Mempercayai ibu.",
                    next: "ending_mother",
                    effects: {
                        flags: {
                            trustsMother: true
                        }
                    }
                },
                {
                    text: "Meragukan identitasnya.",
                    next: "ending_doubt",
                    effects: {
                        flags: {
                            doubtsMother: true
                        }
                    }
                },
                {
                    text: "Kembali ke lantai atas.",
                    next: "upstairs"
                }
            ]
        },


        /* =============================================
           ENDING
        ============================================= */

        ending_truth: {
            location: "KAMAR TERAKHIR",

            ending: "Kebenaran",

            narration: [
                "Perempuan itu berbalik.",
                "Wajahnya adalah wajah Laras.",
                "Wajah yang sama dengan foto di dalam kotak musik.",
                "Aruna akhirnya mengingat semuanya.",
                "Laras bukanlah seseorang yang menghilang.",
                "Laras adalah seseorang yang tidak pernah diizinkan untuk pergi.",
                "Ketika pagi tiba, rumah itu sudah kosong.",
                "Tidak ada Aruna.",
                "Tidak ada Laras.",
                "Hanya sebuah foto keluarga yang kini memperlihatkan tiga orang perempuan sedang tersenyum."
            ]
        },


        ending_face: {
            location: "KAMAR TERAKHIR",

            ending: "Wajah yang Dikenal",

            narration: [
                "Perempuan itu berdiri perlahan.",
                "Wajahnya terlihat sangat mirip dengan Aruna.",
                "Bahkan bekas luka kecil di dekat alisnya pun sama.",
                "Perempuan itu tersenyum.",
                "\"Kamu akhirnya mengembalikan wajahku.\"",
                "Aruna mencoba berteriak.",
                "Namun, suaranya tidak keluar.",
                "Pintu kamar tertutup.",
                "Dan kali ini, tidak ada seorang pun yang membukanya."
            ]
        },


        ending_mother: {
            location: "RUANG BAWAH TANAH",

            ending: "Pulang",

            narration: [
                "Aruna memeluk perempuan itu.",
                "Untuk pertama kalinya setelah sebelas tahun, ia kembali merasakan pelukan ibunya.",
                "Ibunya menangis tanpa henti.",
                "\"Maafkan Ibu, Nak.\"",
                "Mereka meninggalkan rumah sebelum matahari terbit.",
                "Aruna tidak pernah kembali ke desa itu.",
                "Namun, setiap malam pukul 02.13, ia masih mendengar suara seseorang mengetuk pintu kamarnya."
            ]
        },


        ending_doubt: {
            location: "RUANG BAWAH TANAH",

            ending: "Yang Tersisa",

            narration: [
                "Aruna mundur perlahan.",
                "Perempuan itu masih tersenyum.",
                "Namun, bayangannya tidak bergerak mengikuti tubuhnya.",
                "Aruna memahami satu hal.",
                "Mungkin selama ini ibunya memang tidak pernah berada di rumah.",
                "Mungkin ia hanya berbicara dengan sesuatu yang mengenakan wajah ibunya.",
                "Ia berlari menaiki tangga.",
                "Ketika sampai di luar, rumah itu terlihat kosong.",
                "Tidak ada satu pun jejak bahwa seseorang pernah tinggal di sana."
            ]
        },


        ending_escape: {
            location: "HALAMAN DEPAN",

            ending: "Pelarian",

            narration: [
                "Aruna berlari keluar rumah.",
                "Ia tidak ingin tahu apa yang sebenarnya terjadi.",
                "Ia hanya ingin pergi.",
                "Pagar besi terbuka tanpa suara.",
                "Mobilnya masih berada di tempat semula.",
                "Ketika ia menoleh untuk terakhir kalinya, seorang perempuan berdiri di jendela lantai dua.",
                "Perempuan itu melambaikan tangan.",
                "Aruna menyalakan mesin dan meninggalkan desa.",
                "Namun, di kursi penumpang terdapat sebuah boneka beruang yang tidak pernah ia bawa."
            ]
        }

    }

};
