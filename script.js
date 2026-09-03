/**
 * ITM Innovation Hackathon - Certificate Portal
 * 
 * Dynamically loads certificates, creates responsive preview cards,
 * provides live search filtering, full-size preview modal, and direct downloads.
 */

// Embedded certificate data (works offline, with file://, or on static servers)
const DEFAULT_CERTIFICATES = [
  {
    "name": "Athiphou Teng",
    "filename": "Athiphou_Teng.png",
    "path": "ITM_certificate/certificates/Athiphou_Teng.png"
  },
  {
    "name": "Bat PISEY",
    "filename": "Bat_PISEY.png",
    "path": "ITM_certificate/certificates/Bat_PISEY.png"
  },
  {
    "name": "Be DY",
    "filename": "Be_DY.png",
    "path": "ITM_certificate/certificates/Be_DY.png"
  },
  {
    "name": "Bunleang Mao",
    "filename": "Bunleang_Mao.png",
    "path": "ITM_certificate/certificates/Bunleang_Mao.png"
  },
  {
    "name": "Bunleng Peng",
    "filename": "Bunleng_Peng.png",
    "path": "ITM_certificate/certificates/Bunleng_Peng.png"
  },
  {
    "name": "Buth Meta",
    "filename": "Buth_Meta.png",
    "path": "ITM_certificate/certificates/Buth_Meta.png"
  },
  {
    "name": "Chamroeurn Lim",
    "filename": "Chamroeurn_Lim.png",
    "path": "ITM_certificate/certificates/Chamroeurn_Lim.png"
  },
  {
    "name": "Chamrong Prak",
    "filename": "Chamrong_Prak.png",
    "path": "ITM_certificate/certificates/Chamrong_Prak.png"
  },
  {
    "name": "Chan Ekmongkol",
    "filename": "Chan_Ekmongkol.png",
    "path": "ITM_certificate/certificates/Chan_Ekmongkol.png"
  },
  {
    "name": "Chan Sokheng",
    "filename": "Chan_Sokheng.png",
    "path": "ITM_certificate/certificates/Chan_Sokheng.png"
  },
  {
    "name": "Chan keanghuy",
    "filename": "Chan_keanghuy.png",
    "path": "ITM_certificate/certificates/Chan_keanghuy.png"
  },
  {
    "name": "Chankimeng Mean",
    "filename": "Chankimeng_Mean.png",
    "path": "ITM_certificate/certificates/Chankimeng_Mean.png"
  },
  {
    "name": "Chankimhak Korn",
    "filename": "Chankimhak_Korn.png",
    "path": "ITM_certificate/certificates/Chankimhak_Korn.png"
  },
  {
    "name": "Chanmengly Sun",
    "filename": "Chanmengly_Sun.png",
    "path": "ITM_certificate/certificates/Chanmengly_Sun.png"
  },
  {
    "name": "Chanratharo Rath",
    "filename": "Chanratharo_Rath.png",
    "path": "ITM_certificate/certificates/Chanratharo_Rath.png"
  },
  {
    "name": "Chanrithy Phal",
    "filename": "Chanrithy_Phal.png",
    "path": "ITM_certificate/certificates/Chanrithy_Phal.png"
  },
  {
    "name": "Chanrithysak Oung",
    "filename": "Chanrithysak_Oung.png",
    "path": "ITM_certificate/certificates/Chanrithysak_Oung.png"
  },
  {
    "name": "Chanrottanak Sovann",
    "filename": "Chanrottanak_Sovann.png",
    "path": "ITM_certificate/certificates/Chanrottanak_Sovann.png"
  },
  {
    "name": "Chansopanha Try",
    "filename": "Chansopanha_Try.png",
    "path": "ITM_certificate/certificates/Chansopanha_Try.png"
  },
  {
    "name": "Chanteipy Bunchhieng",
    "filename": "Chanteipy_Bunchhieng.png",
    "path": "ITM_certificate/certificates/Chanteipy_Bunchhieng.png"
  },
  {
    "name": "Chanvireak Hout",
    "filename": "Chanvireak_Hout.png",
    "path": "ITM_certificate/certificates/Chanvireak_Hout.png"
  },
  {
    "name": "Cheav Chetharith",
    "filename": "Cheav_Chetharith.png",
    "path": "ITM_certificate/certificates/Cheav_Chetharith.png"
  },
  {
    "name": "Chhanly Supheng",
    "filename": "Chhanly_Supheng.png",
    "path": "ITM_certificate/certificates/Chhanly_Supheng.png"
  },
  {
    "name": "Chhay Lymeng",
    "filename": "Chhay_Lymeng.png",
    "path": "ITM_certificate/certificates/Chhay_Lymeng.png"
  },
  {
    "name": "Chhivpheng SENG",
    "filename": "Chhivpheng_SENG.png",
    "path": "ITM_certificate/certificates/Chhivpheng_SENG.png"
  },
  {
    "name": "Chhuon Mengsal",
    "filename": "Chhuon_Mengsal.png",
    "path": "ITM_certificate/certificates/Chhuon_Mengsal.png"
  },
  {
    "name": "Chin Kungmaliz",
    "filename": "Chin_Kungmaliz.png",
    "path": "ITM_certificate/certificates/Chin_Kungmaliz.png"
  },
  {
    "name": "Choub Ponhvorntey",
    "filename": "Choub_Ponhvorntey.png",
    "path": "ITM_certificate/certificates/Choub_Ponhvorntey.png"
  },
  {
    "name": "Chun Chanheng",
    "filename": "Chun_Chanheng.png",
    "path": "ITM_certificate/certificates/Chun_Chanheng.png"
  },
  {
    "name": "Chung Tak Soy",
    "filename": "Chung_Tak_Soy.png",
    "path": "ITM_certificate/certificates/Chung_Tak_Soy.png"
  },
  {
    "name": "David NOV",
    "filename": "David_NOV.png",
    "path": "ITM_certificate/certificates/David_NOV.png"
  },
  {
    "name": "David Teven",
    "filename": "David_Teven.png",
    "path": "ITM_certificate/certificates/David_Teven.png"
  },
  {
    "name": "Deb Ramsfeld",
    "filename": "Deb_Ramsfeld.png",
    "path": "ITM_certificate/certificates/Deb_Ramsfeld.png"
  },
  {
    "name": "Dharmaraj Pareth",
    "filename": "Dharmaraj_Pareth.png",
    "path": "ITM_certificate/certificates/Dharmaraj_Pareth.png"
  },
  {
    "name": "Dyna Lay",
    "filename": "Dyna_Lay.png",
    "path": "ITM_certificate/certificates/Dyna_Lay.png"
  },
  {
    "name": "Hap Sreypich",
    "filename": "Hap_Sreypich.png",
    "path": "ITM_certificate/certificates/Hap_Sreypich.png"
  },
  {
    "name": "Has beauwin",
    "filename": "Has_beauwin.png",
    "path": "ITM_certificate/certificates/Has_beauwin.png"
  },
  {
    "name": "Helen Pheng",
    "filename": "Helen_Pheng.png",
    "path": "ITM_certificate/certificates/Helen_Pheng.png"
  },
  {
    "name": "Heng Dalin",
    "filename": "Heng_Dalin.png",
    "path": "ITM_certificate/certificates/Heng_Dalin.png"
  },
  {
    "name": "Heng Ly Bou",
    "filename": "Heng_Ly_Bou.png",
    "path": "ITM_certificate/certificates/Heng_Ly_Bou.png"
  },
  {
    "name": "Hoeung Tithvichhay",
    "filename": "Hoeung_Tithvichhay.png",
    "path": "ITM_certificate/certificates/Hoeung_Tithvichhay.png"
  },
  {
    "name": "Hokseng Nuon",
    "filename": "Hokseng_Nuon.png",
    "path": "ITM_certificate/certificates/Hokseng_Nuon.png"
  },
  {
    "name": "Hon Venghong",
    "filename": "Hon_Venghong.png",
    "path": "ITM_certificate/certificates/Hon_Venghong.png"
  },
  {
    "name": "Hong Chakriya",
    "filename": "Hong_Chakriya.png",
    "path": "ITM_certificate/certificates/Hong_Chakriya.png"
  },
  {
    "name": "Hong Rothsokeven",
    "filename": "Hong_Rothsokeven.png",
    "path": "ITM_certificate/certificates/Hong_Rothsokeven.png"
  },
  {
    "name": "Hong Saoleang",
    "filename": "Hong_Saoleang.png",
    "path": "ITM_certificate/certificates/Hong_Saoleang.png"
  },
  {
    "name": "Hongleng Chamroeun",
    "filename": "Hongleng_Chamroeun.png",
    "path": "ITM_certificate/certificates/Hongleng_Chamroeun.png"
  },
  {
    "name": "HourMeng Eang",
    "filename": "HourMeng_Eang.png",
    "path": "ITM_certificate/certificates/HourMeng_Eang.png"
  },
  {
    "name": "Hour Sivming",
    "filename": "Hour_Sivming.png",
    "path": "ITM_certificate/certificates/Hour_Sivming.png"
  },
  {
    "name": "Ito Reika",
    "filename": "Ito_Reika.png",
    "path": "ITM_certificate/certificates/Ito_Reika.png"
  },
  {
    "name": "KImngea Chhorn",
    "filename": "KImngea_Chhorn.png",
    "path": "ITM_certificate/certificates/KImngea_Chhorn.png"
  },
  {
    "name": "Kakwey Hai",
    "filename": "Kakwey_Hai.png",
    "path": "ITM_certificate/certificates/Kakwey_Hai.png"
  },
  {
    "name": "Keangheang Oeung",
    "filename": "Keangheang_Oeung.png",
    "path": "ITM_certificate/certificates/Keangheang_Oeung.png"
  },
  {
    "name": "Keo Angkearith",
    "filename": "Keo_Angkearith.png",
    "path": "ITM_certificate/certificates/Keo_Angkearith.png"
  },
  {
    "name": "Keochanriddhthyka Nup",
    "filename": "Keochanriddhthyka_Nup.png",
    "path": "ITM_certificate/certificates/Keochanriddhthyka_Nup.png"
  },
  {
    "name": "Kethyamana Te",
    "filename": "Kethyamana_Te.png",
    "path": "ITM_certificate/certificates/Kethyamana_Te.png"
  },
  {
    "name": "KhaRanit",
    "filename": "KhaRanit.png",
    "path": "ITM_certificate/certificates/KhaRanit.png"
  },
  {
    "name": "Kim Eng Somony",
    "filename": "Kim_Eng_Somony.png",
    "path": "ITM_certificate/certificates/Kim_Eng_Somony.png"
  },
  {
    "name": "Kimseang Sam",
    "filename": "Kimseang_Sam.png",
    "path": "ITM_certificate/certificates/Kimseang_Sam.png"
  },
  {
    "name": "Kimseav Gouv",
    "filename": "Kimseav_Gouv.png",
    "path": "ITM_certificate/certificates/Kimseav_Gouv.png"
  },
  {
    "name": "Kimsien SAO",
    "filename": "Kimsien_SAO.png",
    "path": "ITM_certificate/certificates/Kimsien_SAO.png"
  },
  {
    "name": "Kimsorng Chea",
    "filename": "Kimsorng_Chea.png",
    "path": "ITM_certificate/certificates/Kimsorng_Chea.png"
  },
  {
    "name": "Kiripich Prey",
    "filename": "Kiripich_Prey.png",
    "path": "ITM_certificate/certificates/Kiripich_Prey.png"
  },
  {
    "name": "Kong Leak Smey",
    "filename": "Kong_Leak_Smey.png",
    "path": "ITM_certificate/certificates/Kong_Leak_Smey.png"
  },
  {
    "name": "Kosal Kakada",
    "filename": "Kosal_Kakada.png",
    "path": "ITM_certificate/certificates/Kosal_Kakada.png"
  },
  {
    "name": "Koy Sothalysetha",
    "filename": "Koy_Sothalysetha.png",
    "path": "ITM_certificate/certificates/Koy_Sothalysetha.png"
  },
  {
    "name": "Kunthybothmohasal Ly",
    "filename": "Kunthybothmohasal_Ly.png",
    "path": "ITM_certificate/certificates/Kunthybothmohasal_Ly.png"
  },
  {
    "name": "Laihor Hong",
    "filename": "Laihor_Hong.png",
    "path": "ITM_certificate/certificates/Laihor_Hong.png"
  },
  {
    "name": "Lay Sovannarith",
    "filename": "Lay_Sovannarith.png",
    "path": "ITM_certificate/certificates/Lay_Sovannarith.png"
  },
  {
    "name": "Leakhena Lou",
    "filename": "Leakhena_Lou.png",
    "path": "ITM_certificate/certificates/Leakhena_Lou.png"
  },
  {
    "name": "Leang Y Noun",
    "filename": "Leang_Y_Noun.png",
    "path": "ITM_certificate/certificates/Leang_Y_Noun.png"
  },
  {
    "name": "Lileakhena Rithy",
    "filename": "Lileakhena_Rithy.png",
    "path": "ITM_certificate/certificates/Lileakhena_Rithy.png"
  },
  {
    "name": "Lim Monyrachna",
    "filename": "Lim_Monyrachna.png",
    "path": "ITM_certificate/certificates/Lim_Monyrachna.png"
  },
  {
    "name": "Lina Pha",
    "filename": "Lina_Pha.png",
    "path": "ITM_certificate/certificates/Lina_Pha.png"
  },
  {
    "name": "Lisa Sear",
    "filename": "Lisa_Sear.png",
    "path": "ITM_certificate/certificates/Lisa_Sear.png"
  },
  {
    "name": "LuxKanha Seng",
    "filename": "LuxKanha_Seng.png",
    "path": "ITM_certificate/certificates/LuxKanha_Seng.png"
  },
  {
    "name": "Ly Chheavnguon",
    "filename": "Ly_Chheavnguon.png",
    "path": "ITM_certificate/certificates/Ly_Chheavnguon.png"
  },
  {
    "name": "Lysareth Sophanuth",
    "filename": "Lysareth_Sophanuth.png",
    "path": "ITM_certificate/certificates/Lysareth_Sophanuth.png"
  },
  {
    "name": "Maliny Phon",
    "filename": "Maliny_Phon.png",
    "path": "ITM_certificate/certificates/Maliny_Phon.png"
  },
  {
    "name": "Manny Bann",
    "filename": "Manny_Bann.png",
    "path": "ITM_certificate/certificates/Manny_Bann.png"
  },
  {
    "name": "Marina Hun",
    "filename": "Marina_Hun.png",
    "path": "ITM_certificate/certificates/Marina_Hun.png"
  },
  {
    "name": "Masola Ly",
    "filename": "Masola_Ly.png",
    "path": "ITM_certificate/certificates/Masola_Ly.png"
  },
  {
    "name": "Meas chhordana",
    "filename": "Meas_chhordana.png",
    "path": "ITM_certificate/certificates/Meas_chhordana.png"
  },
  {
    "name": "Minh Ouddom Panha",
    "filename": "Minh_Ouddom_Panha.png",
    "path": "ITM_certificate/certificates/Minh_Ouddom_Panha.png"
  },
  {
    "name": "Mong Gekleang",
    "filename": "Mong_Gekleang.png",
    "path": "ITM_certificate/certificates/Mong_Gekleang.png"
  },
  {
    "name": "Monika Meach",
    "filename": "Monika_Meach.png",
    "path": "ITM_certificate/certificates/Monika_Meach.png"
  },
  {
    "name": "Morkat To",
    "filename": "Morkat_To.png",
    "path": "ITM_certificate/certificates/Morkat_To.png"
  },
  {
    "name": "Mouy Noung",
    "filename": "Mouy_Noung.png",
    "path": "ITM_certificate/certificates/Mouy_Noung.png"
  },
  {
    "name": "Mouykim Ly",
    "filename": "Mouykim_Ly.png",
    "path": "ITM_certificate/certificates/Mouykim_Ly.png"
  },
  {
    "name": "NANG Sotheavin",
    "filename": "NANG_Sotheavin.png",
    "path": "ITM_certificate/certificates/NANG_Sotheavin.png"
  },
  {
    "name": "Naihour Sok",
    "filename": "Naihour_Sok.png",
    "path": "ITM_certificate/certificates/Naihour_Sok.png"
  },
  {
    "name": "Narin Sai",
    "filename": "Narin_Sai.png",
    "path": "ITM_certificate/certificates/Narin_Sai.png"
  },
  {
    "name": "Nathanel Phin",
    "filename": "Nathanel_Phin.png",
    "path": "ITM_certificate/certificates/Nathanel_Phin.png"
  },
  {
    "name": "Nget Panharidh",
    "filename": "Nget_Panharidh.png",
    "path": "ITM_certificate/certificates/Nget_Panharidh.png"
  },
  {
    "name": "Nho Tomaneath",
    "filename": "Nho_Tomaneath.png",
    "path": "ITM_certificate/certificates/Nho_Tomaneath.png"
  },
  {
    "name": "Nisa tou",
    "filename": "Nisa_tou.png",
    "path": "ITM_certificate/certificates/Nisa_tou.png"
  },
  {
    "name": "Nitta Leng",
    "filename": "Nitta_Leng.png",
    "path": "ITM_certificate/certificates/Nitta_Leng.png"
  },
  {
    "name": "Noy Chalinh",
    "filename": "Noy_Chalinh.png",
    "path": "ITM_certificate/certificates/Noy_Chalinh.png"
  },
  {
    "name": "Nu Siphou",
    "filename": "Nu_Siphou.png",
    "path": "ITM_certificate/certificates/Nu_Siphou.png"
  },
  {
    "name": "Nupkun Sambath",
    "filename": "Nupkun_Sambath.png",
    "path": "ITM_certificate/certificates/Nupkun_Sambath.png"
  },
  {
    "name": "OUCH chhumsovannary",
    "filename": "OUCH_chhumsovannary.png",
    "path": "ITM_certificate/certificates/OUCH_chhumsovannary.png"
  },
  {
    "name": "Oeng Naly",
    "filename": "Oeng_Naly.png",
    "path": "ITM_certificate/certificates/Oeng_Naly.png"
  },
  {
    "name": "Ou Seila",
    "filename": "Ou_Seila.png",
    "path": "ITM_certificate/certificates/Ou_Seila.png"
  },
  {
    "name": "Panha Phoun",
    "filename": "Panha_Phoun.png",
    "path": "ITM_certificate/certificates/Panha_Phoun.png"
  },
  {
    "name": "Panharith Ith",
    "filename": "Panharith_Ith.png",
    "path": "ITM_certificate/certificates/Panharith_Ith.png"
  },
  {
    "name": "Pann ketya",
    "filename": "Pann_ketya.png",
    "path": "ITM_certificate/certificates/Pann_ketya.png"
  },
  {
    "name": "Peav Sengly",
    "filename": "Peav_Sengly.png",
    "path": "ITM_certificate/certificates/Peav_Sengly.png"
  },
  {
    "name": "Phalla SUONG",
    "filename": "Phalla_SUONG.png",
    "path": "ITM_certificate/certificates/Phalla_SUONG.png"
  },
  {
    "name": "Phary Oeun",
    "filename": "Phary_Oeun.png",
    "path": "ITM_certificate/certificates/Phary_Oeun.png"
  },
  {
    "name": "Pheareak Phorn",
    "filename": "Pheareak_Phorn.png",
    "path": "ITM_certificate/certificates/Pheareak_Phorn.png"
  },
  {
    "name": "Phin Pheakdey",
    "filename": "Phin_Pheakdey.png",
    "path": "ITM_certificate/certificates/Phin_Pheakdey.png"
  },
  {
    "name": "Phon Sophivon",
    "filename": "Phon_Sophivon.png",
    "path": "ITM_certificate/certificates/Phon_Sophivon.png"
  },
  {
    "name": "Phoun Phan",
    "filename": "Phoun_Phan.png",
    "path": "ITM_certificate/certificates/Phoun_Phan.png"
  },
  {
    "name": "Phouvisal Chy",
    "filename": "Phouvisal_Chy.png",
    "path": "ITM_certificate/certificates/Phouvisal_Chy.png"
  },
  {
    "name": "Phy An Oum",
    "filename": "Phy_An_Oum.png",
    "path": "ITM_certificate/certificates/Phy_An_Oum.png"
  },
  {
    "name": "Pich Bonaran",
    "filename": "Pich_Bonaran.png",
    "path": "ITM_certificate/certificates/Pich_Bonaran.png"
  },
  {
    "name": "Pichrachana Veng",
    "filename": "Pichrachana_Veng.png",
    "path": "ITM_certificate/certificates/Pichrachana_Veng.png"
  },
  {
    "name": "Por Menghong",
    "filename": "Por_Menghong.png",
    "path": "ITM_certificate/certificates/Por_Menghong.png"
  },
  {
    "name": "Porpheng Taing",
    "filename": "Porpheng_Taing.png",
    "path": "ITM_certificate/certificates/Porpheng_Taing.png"
  },
  {
    "name": "Pou Chhiangheng",
    "filename": "Pou_Chhiangheng.png",
    "path": "ITM_certificate/certificates/Pou_Chhiangheng.png"
  },
  {
    "name": "Prom Ekreach",
    "filename": "Prom_Ekreach.png",
    "path": "ITM_certificate/certificates/Prom_Ekreach.png"
  },
  {
    "name": "Punhakleap Oeun",
    "filename": "Punhakleap_Oeun.png",
    "path": "ITM_certificate/certificates/Punhakleap_Oeun.png"
  },
  {
    "name": "Ra Malina",
    "filename": "Ra_Malina.png",
    "path": "ITM_certificate/certificates/Ra_Malina.png"
  },
  {
    "name": "Rachana Vary",
    "filename": "Rachana_Vary.png",
    "path": "ITM_certificate/certificates/Rachana_Vary.png"
  },
  {
    "name": "Raksmey Dara",
    "filename": "Raksmey_Dara.png",
    "path": "ITM_certificate/certificates/Raksmey_Dara.png"
  },
  {
    "name": "Rapong Hao",
    "filename": "Rapong_Hao.png",
    "path": "ITM_certificate/certificates/Rapong_Hao.png"
  },
  {
    "name": "Reaksa Seurng",
    "filename": "Reaksa_Seurng.png",
    "path": "ITM_certificate/certificates/Reaksa_Seurng.png"
  },
  {
    "name": "Reasey Kry",
    "filename": "Reasey_Kry.png",
    "path": "ITM_certificate/certificates/Reasey_Kry.png"
  },
  {
    "name": "Ridhtesakk Khuon",
    "filename": "Ridhtesakk_Khuon.png",
    "path": "ITM_certificate/certificates/Ridhtesakk_Khuon.png"
  },
  {
    "name": "Rin Christpor",
    "filename": "Rin_Christpor.png",
    "path": "ITM_certificate/certificates/Rin_Christpor.png"
  },
  {
    "name": "Rithseyhak Chheng Y",
    "filename": "Rithseyhak_Chheng_Y.png",
    "path": "ITM_certificate/certificates/Rithseyhak_Chheng_Y.png"
  },
  {
    "name": "Rithy Tay",
    "filename": "Rithy_Tay.png",
    "path": "ITM_certificate/certificates/Rithy_Tay.png"
  },
  {
    "name": "Roeun Lida",
    "filename": "Roeun_Lida.png",
    "path": "ITM_certificate/certificates/Roeun_Lida.png"
  },
  {
    "name": "Rommnea Tim",
    "filename": "Rommnea_Tim.png",
    "path": "ITM_certificate/certificates/Rommnea_Tim.png"
  },
  {
    "name": "Ruckha Sournara",
    "filename": "Ruckha_Sournara.png",
    "path": "ITM_certificate/certificates/Ruckha_Sournara.png"
  },
  {
    "name": "SATTISAMBATH SUON",
    "filename": "SATTISAMBATH_SUON.png",
    "path": "ITM_certificate/certificates/SATTISAMBATH_SUON.png"
  },
  {
    "name": "SIN Vimolika",
    "filename": "SIN_Vimolika.png",
    "path": "ITM_certificate/certificates/SIN_Vimolika.png"
  },
  {
    "name": "Samnang Champey Sok",
    "filename": "Samnang_Champey_Sok.png",
    "path": "ITM_certificate/certificates/Samnang_Champey_Sok.png"
  },
  {
    "name": "Samnang Rithy Bot",
    "filename": "Samnang_Rithy_Bot.png",
    "path": "ITM_certificate/certificates/Samnang_Rithy_Bot.png"
  },
  {
    "name": "Samnang Vin",
    "filename": "Samnang_Vin.png",
    "path": "ITM_certificate/certificates/Samnang_Vin.png"
  },
  {
    "name": "Samolty Lundy",
    "filename": "Samolty_Lundy.png",
    "path": "ITM_certificate/certificates/Samolty_Lundy.png"
  },
  {
    "name": "Samrithyruth Phalla",
    "filename": "Samrithyruth_Phalla.png",
    "path": "ITM_certificate/certificates/Samrithyruth_Phalla.png"
  },
  {
    "name": "San Lyhour",
    "filename": "San_Lyhour.png",
    "path": "ITM_certificate/certificates/San_Lyhour.png"
  },
  {
    "name": "Sann Kohn",
    "filename": "Sann_Kohn.png",
    "path": "ITM_certificate/certificates/Sann_Kohn.png"
  },
  {
    "name": "Sao Sochealika",
    "filename": "Sao_Sochealika.png",
    "path": "ITM_certificate/certificates/Sao_Sochealika.png"
  },
  {
    "name": "Saroeun Rath",
    "filename": "Saroeun_Rath.png",
    "path": "ITM_certificate/certificates/Saroeun_Rath.png"
  },
  {
    "name": "Seangchanmony Iung",
    "filename": "Seangchanmony_Iung.png",
    "path": "ITM_certificate/certificates/Seangchanmony_Iung.png"
  },
  {
    "name": "Seanghai Long",
    "filename": "Seanghai_Long.png",
    "path": "ITM_certificate/certificates/Seanghai_Long.png"
  },
  {
    "name": "Seavchheang Try",
    "filename": "Seavchheang_Try.png",
    "path": "ITM_certificate/certificates/Seavchheang_Try.png"
  },
  {
    "name": "Seng Sokngim",
    "filename": "Seng_Sokngim.png",
    "path": "ITM_certificate/certificates/Seng_Sokngim.png"
  },
  {
    "name": "Sengyean Heng",
    "filename": "Sengyean_Heng.png",
    "path": "ITM_certificate/certificates/Sengyean_Heng.png"
  },
  {
    "name": "Serei Zorita Lam",
    "filename": "Serei_Zorita_Lam.png",
    "path": "ITM_certificate/certificates/Serei_Zorita_Lam.png"
  },
  {
    "name": "Sereivathna Sochet",
    "filename": "Sereivathna_Sochet.png",
    "path": "ITM_certificate/certificates/Sereivathna_Sochet.png"
  },
  {
    "name": "Sereyboth Pok",
    "filename": "Sereyboth_Pok.png",
    "path": "ITM_certificate/certificates/Sereyboth_Pok.png"
  },
  {
    "name": "Serivathana Khon",
    "filename": "Serivathana_Khon.png",
    "path": "ITM_certificate/certificates/Serivathana_Khon.png"
  },
  {
    "name": "Seyhakrathnak LIm",
    "filename": "Seyhakrathnak_LIm.png",
    "path": "ITM_certificate/certificates/Seyhakrathnak_LIm.png"
  },
  {
    "name": "Sieng Sovathna",
    "filename": "Sieng_Sovathna.png",
    "path": "ITM_certificate/certificates/Sieng_Sovathna.png"
  },
  {
    "name": "Sim Chanvibol",
    "filename": "Sim_Chanvibol.png",
    "path": "ITM_certificate/certificates/Sim_Chanvibol.png"
  },
  {
    "name": "Sith Sovichea You (Vince)",
    "filename": "Sith_Sovichea_You_(Vince).png",
    "path": "ITM_certificate/certificates/Sith_Sovichea_You_(Vince).png"
  },
  {
    "name": "Sivutra Min",
    "filename": "Sivutra_Min.png",
    "path": "ITM_certificate/certificates/Sivutra_Min.png"
  },
  {
    "name": "Sok Ratanak Vichea",
    "filename": "Sok_Ratanak_Vichea.png",
    "path": "ITM_certificate/certificates/Sok_Ratanak_Vichea.png"
  },
  {
    "name": "Sokfyrath Pho",
    "filename": "Sokfyrath_Pho.png",
    "path": "ITM_certificate/certificates/Sokfyrath_Pho.png"
  },
  {
    "name": "Sokheng Chhai",
    "filename": "Sokheng_Chhai.png",
    "path": "ITM_certificate/certificates/Sokheng_Chhai.png"
  },
  {
    "name": "Sokhong Huan",
    "filename": "Sokhong_Huan.png",
    "path": "ITM_certificate/certificates/Sokhong_Huan.png"
  },
  {
    "name": "Soknang Khea",
    "filename": "Soknang_Khea.png",
    "path": "ITM_certificate/certificates/Soknang_Khea.png"
  },
  {
    "name": "Sokunthea Bun",
    "filename": "Sokunthea_Bun.png",
    "path": "ITM_certificate/certificates/Sokunthea_Bun.png"
  },
  {
    "name": "Somakna Saroeurn",
    "filename": "Somakna_Saroeurn.png",
    "path": "ITM_certificate/certificates/Somakna_Saroeurn.png"
  },
  {
    "name": "Somavottey Buntha",
    "filename": "Somavottey_Buntha.png",
    "path": "ITM_certificate/certificates/Somavottey_Buntha.png"
  },
  {
    "name": "Someas Nguon",
    "filename": "Someas_Nguon.png",
    "path": "ITM_certificate/certificates/Someas_Nguon.png"
  },
  {
    "name": "Sophanyrauth Chhan",
    "filename": "Sophanyrauth_Chhan.png",
    "path": "ITM_certificate/certificates/Sophanyrauth_Chhan.png"
  },
  {
    "name": "Sopharoth Oeun",
    "filename": "Sopharoth_Oeun.png",
    "path": "ITM_certificate/certificates/Sopharoth_Oeun.png"
  },
  {
    "name": "Sophea Phal",
    "filename": "Sophea_Phal.png",
    "path": "ITM_certificate/certificates/Sophea_Phal.png"
  },
  {
    "name": "Sophy Moeurn",
    "filename": "Sophy_Moeurn.png",
    "path": "ITM_certificate/certificates/Sophy_Moeurn.png"
  },
  {
    "name": "Sorphorn Phen",
    "filename": "Sorphorn_Phen.png",
    "path": "ITM_certificate/certificates/Sorphorn_Phen.png"
  },
  {
    "name": "Sothamonny So",
    "filename": "Sothamonny_So.png",
    "path": "ITM_certificate/certificates/Sothamonny_So.png"
  },
  {
    "name": "Sotheary Rith",
    "filename": "Sotheary_Rith.png",
    "path": "ITM_certificate/certificates/Sotheary_Rith.png"
  },
  {
    "name": "Sothun Ly",
    "filename": "Sothun__Ly.png",
    "path": "ITM_certificate/certificates/Sothun__Ly.png"
  },
  {
    "name": "Soung Thongsy",
    "filename": "Soung_Thongsy.png",
    "path": "ITM_certificate/certificates/Soung_Thongsy.png"
  },
  {
    "name": "Sour Chansokpanha",
    "filename": "Sour_Chansokpanha.png",
    "path": "ITM_certificate/certificates/Sour_Chansokpanha.png"
  },
  {
    "name": "SovanRotha Pith",
    "filename": "SovanRotha_Pith.png",
    "path": "ITM_certificate/certificates/SovanRotha_Pith.png"
  },
  {
    "name": "Sovandara Porm",
    "filename": "Sovandara_Porm.png",
    "path": "ITM_certificate/certificates/Sovandara_Porm.png"
  },
  {
    "name": "Sovanlysar Din",
    "filename": "Sovanlysar_Din.png",
    "path": "ITM_certificate/certificates/Sovanlysar_Din.png"
  },
  {
    "name": "Sovannpanharo Keo",
    "filename": "Sovannpanharo_Keo.png",
    "path": "ITM_certificate/certificates/Sovannpanharo_Keo.png"
  },
  {
    "name": "Sreymoch Sakun",
    "filename": "Sreymoch_Sakun.png",
    "path": "ITM_certificate/certificates/Sreymoch_Sakun.png"
  },
  {
    "name": "Sreysrossophany Liv",
    "filename": "Sreysrossophany_Liv.png",
    "path": "ITM_certificate/certificates/Sreysrossophany_Liv.png"
  },
  {
    "name": "Sros Songha",
    "filename": "Sros_Songha.png",
    "path": "ITM_certificate/certificates/Sros_Songha.png"
  },
  {
    "name": "Srun Lyheang",
    "filename": "Srun_Lyheang.png",
    "path": "ITM_certificate/certificates/Srun_Lyheang.png"
  },
  {
    "name": "Srunratanak Boy",
    "filename": "Srunratanak_Boy.png",
    "path": "ITM_certificate/certificates/Srunratanak_Boy.png"
  },
  {
    "name": "THON Chhengkeang",
    "filename": "THON_Chhengkeang.png",
    "path": "ITM_certificate/certificates/THON_Chhengkeang.png"
  },
  {
    "name": "Taing Tunvatnak",
    "filename": "Taing_Tunvatnak.png",
    "path": "ITM_certificate/certificates/Taing_Tunvatnak.png"
  },
  {
    "name": "Taing sokkhang",
    "filename": "Taing_sokkhang.png",
    "path": "ITM_certificate/certificates/Taing_sokkhang.png"
  },
  {
    "name": "Te Kimmeng",
    "filename": "Te_Kimmeng.png",
    "path": "ITM_certificate/certificates/Te_Kimmeng.png"
  },
  {
    "name": "Tekkheang Lay",
    "filename": "Tekkheang_Lay.png",
    "path": "ITM_certificate/certificates/Tekkheang_Lay.png"
  },
  {
    "name": "Teng meyling",
    "filename": "Teng_meyling.png",
    "path": "ITM_certificate/certificates/Teng_meyling.png"
  },
  {
    "name": "Tevy Im",
    "filename": "Tevy_Im.png",
    "path": "ITM_certificate/certificates/Tevy_Im.png"
  },
  {
    "name": "Thai Sokchea",
    "filename": "Thai_Sokchea.png",
    "path": "ITM_certificate/certificates/Thai_Sokchea.png"
  },
  {
    "name": "Thidaroth Sokun",
    "filename": "Thidaroth_Sokun.png",
    "path": "ITM_certificate/certificates/Thidaroth_Sokun.png"
  },
  {
    "name": "Thiravann Rom",
    "filename": "Thiravann_Rom.png",
    "path": "ITM_certificate/certificates/Thiravann_Rom.png"
  },
  {
    "name": "Thorng Piseth",
    "filename": "Thorng_Piseth.png",
    "path": "ITM_certificate/certificates/Thorng_Piseth.png"
  },
  {
    "name": "Thy Danita",
    "filename": "Thy_Danita.png",
    "path": "ITM_certificate/certificates/Thy_Danita.png"
  },
  {
    "name": "Tinta Phouy",
    "filename": "Tinta_Phouy.png",
    "path": "ITM_certificate/certificates/Tinta_Phouy.png"
  },
  {
    "name": "Tithsophaliza Siea",
    "filename": "Tithsophaliza_Siea.png",
    "path": "ITM_certificate/certificates/Tithsophaliza_Siea.png"
  },
  {
    "name": "To Bota",
    "filename": "To_Bota.png",
    "path": "ITM_certificate/certificates/To_Bota.png"
  },
  {
    "name": "Treng Buntoeunsoravid",
    "filename": "Treng_Buntoeunsoravid.png",
    "path": "ITM_certificate/certificates/Treng_Buntoeunsoravid.png"
  },
  {
    "name": "Try Vithanuth",
    "filename": "Try_Vithanuth.png",
    "path": "ITM_certificate/certificates/Try_Vithanuth.png"
  },
  {
    "name": "UNG Soucheav",
    "filename": "UNG_Soucheav.png",
    "path": "ITM_certificate/certificates/UNG_Soucheav.png"
  },
  {
    "name": "Um Visal",
    "filename": "Um_Visal.png",
    "path": "ITM_certificate/certificates/Um_Visal.png"
  },
  {
    "name": "Ung Sochannrathanakboth",
    "filename": "Ung_Sochannrathanakboth.png",
    "path": "ITM_certificate/certificates/Ung_Sochannrathanakboth.png"
  },
  {
    "name": "Vann Chandaravichhey",
    "filename": "Vann_Chandaravichhey.png",
    "path": "ITM_certificate/certificates/Vann_Chandaravichhey.png"
  },
  {
    "name": "Vannarith Oem",
    "filename": "Vannarith_Oem.png",
    "path": "ITM_certificate/certificates/Vannarith_Oem.png"
  },
  {
    "name": "Vannet Seung",
    "filename": "Vannet_Seung.png",
    "path": "ITM_certificate/certificates/Vannet_Seung.png"
  },
  {
    "name": "Vatana Ka",
    "filename": "Vatana_Ka.png",
    "path": "ITM_certificate/certificates/Vatana_Ka.png"
  },
  {
    "name": "Veansa Voeun",
    "filename": "Veansa_Voeun.png",
    "path": "ITM_certificate/certificates/Veansa_Voeun.png"
  },
  {
    "name": "Vipheakna Sin",
    "filename": "Vipheakna_Sin.png",
    "path": "ITM_certificate/certificates/Vipheakna_Sin.png"
  },
  {
    "name": "Vireakpanha CHHENG",
    "filename": "Vireakpanha_CHHENG.png",
    "path": "ITM_certificate/certificates/Vireakpanha_CHHENG.png"
  },
  {
    "name": "Vireaksa Sarun",
    "filename": "Vireaksa_Sarun.png",
    "path": "ITM_certificate/certificates/Vireaksa_Sarun.png"
  },
  {
    "name": "Visessvitia Nuon",
    "filename": "Visessvitia_Nuon.png",
    "path": "ITM_certificate/certificates/Visessvitia_Nuon.png"
  },
  {
    "name": "Vongvathiny Prak",
    "filename": "Vongvathiny_Prak.png",
    "path": "ITM_certificate/certificates/Vongvathiny_Prak.png"
  },
  {
    "name": "Vouchchheng Sok",
    "filename": "Vouchchheng_Sok.png",
    "path": "ITM_certificate/certificates/Vouchchheng_Sok.png"
  },
  {
    "name": "Wongwathanak Dyna",
    "filename": "Wongwathanak_Dyna.png",
    "path": "ITM_certificate/certificates/Wongwathanak_Dyna.png"
  },
  {
    "name": "Ya David",
    "filename": "Ya_David.png",
    "path": "ITM_certificate/certificates/Ya_David.png"
  },
  {
    "name": "Yin Keo Odom",
    "filename": "Yin_Keo_Odom.png",
    "path": "ITM_certificate/certificates/Yin_Keo_Odom.png"
  }
];

// Helper to escape HTML special characters
function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// Initialize certificate viewer
async function initCertificates() {
  // 1. Locate the container element (supports .certificate or .certiicate)
  const container = document.querySelector('.certificate') || document.querySelector('.certiicate');
  if (!container) {
    console.error('Certificate container (.certificate or .certiicate) not found in the DOM.');
    return;
  }

  // 2. Fetch fresh certificate list if available, otherwise fallback to embedded data
  let certificates = DEFAULT_CERTIFICATES;
  const manifestPaths = ['ITM_certificate/certificates/certificates.json', 'certificates.json'];

  for (const manifestPath of manifestPaths) {
    try {
      const response = await fetch(manifestPath);
      if (response.ok) {
        const fetchedData = await response.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          certificates = fetchedData;
          break;
        }
      }
    } catch (e) {
      // Fetch may fail on file:// protocol or CORS; safely use DEFAULT_CERTIFICATES
    }
  }

  // 3. Clear container & build cards
  container.innerHTML = '';
  const cardObjects = [];

  certificates.forEach((cert) => {
    const card = document.createElement('div');
    card.className = 'certificate-card';
    card.setAttribute('data-name', cert.name.toLowerCase());

    const isPdf = cert.filename.toLowerCase().endsWith('.pdf');

    // Top: Preview of the certificate file
    const previewEl = document.createElement('div');
    previewEl.className = 'card-preview';
    previewEl.setAttribute('title', `Click to preview certificate for ${cert.name}`);

    if (isPdf) {
      previewEl.innerHTML = `
        <div class="pdf-preview-box">
          <i class="fa-solid fa-file-pdf pdf-icon"></i>
          <span class="pdf-filename">${escapeHtml(cert.filename)}</span>
        </div>
        <div class="preview-overlay">
          <i class="fa-solid fa-magnifying-glass-plus"></i> View Preview
        </div>
      `;
    } else {
      previewEl.innerHTML = `
        <img src="${cert.path}" alt="Certificate preview for ${escapeHtml(cert.name)}" loading="lazy" />
        <div class="preview-overlay">
          <i class="fa-solid fa-magnifying-glass-plus"></i> View Preview
        </div>
      `;
    }

    previewEl.addEventListener('click', () => {
      openPreviewModal(cert, isPdf);
    });

    // Middle: Person name
    const infoEl = document.createElement('div');
    infoEl.className = 'card-info';
    infoEl.innerHTML = `
      <h3 class="participant-name">${escapeHtml(cert.name)}</h3>
      <span class="cert-badge"><i class="fa-solid fa-award"></i> Certificate of Participation</span>
    `;

    // Bottom: Download button
    const actionsEl = document.createElement('div');
    actionsEl.className = 'card-actions';
    actionsEl.innerHTML = `
      <a href="${cert.path}" download="${cert.filename}" class="download-btn" title="Download certificate for ${escapeHtml(cert.name)}">
        <i class="fa-solid fa-download"></i> Download
      </a>
    `;

    card.appendChild(previewEl);
    card.appendChild(infoEl);
    card.appendChild(actionsEl);

    container.appendChild(card);

    cardObjects.push({
      element: card,
      name: cert.name.toLowerCase()
    });
  });

  // 4. Setup Search & Filter
  setupSearch(container, cardObjects);

  // 5. Setup Smooth Scroll for Banner
  setupSmoothScroll();
}

// Filter certificates by name
function setupSearch(container, cardObjects) {
  const searchInput = document.querySelector('.search_bar input');
  if (!searchInput) return;

  searchInput.setAttribute('placeholder', 'Search participant name...');
  searchInput.setAttribute('aria-label', 'Search certificates by name');

  const searchContainer = document.querySelector('.search_bar');
  let counter = document.querySelector('.search-counter');
  if (!counter && searchContainer) {
    counter = document.createElement('p');
    counter.className = 'search-counter';
    searchContainer.appendChild(counter);
  }

  // Empty state container
  let emptyState = document.createElement('div');
  emptyState.className = 'no-certificates-found';
  emptyState.style.display = 'none';
  container.parentElement.appendChild(emptyState);

  function updateDisplay(query) {
    let count = 0;
    const cleanQuery = query.trim().toLowerCase();

    cardObjects.forEach(({ element, name }) => {
      if (!cleanQuery || name.includes(cleanQuery)) {
        element.style.display = '';
        count++;
      } else {
        element.style.display = 'none';
      }
    });

    if (counter) {
      if (cleanQuery) {
        counter.textContent = `Found ${count} certificate${count === 1 ? '' : 's'} for "${query.trim()}"`;
      } else {
        counter.textContent = `Showing all ${cardObjects.length} certificates`;
      }
    }

    if (count === 0) {
      emptyState.innerHTML = `
        <div class="empty-state-content">
          <i class="fa-regular fa-face-frown"></i>
          <h3>No Certificates Found</h3>
          <p>We couldn't find any certificate matching "<strong>${escapeHtml(query)}</strong>".</p>
          <button type="button" class="clear-search-btn">Show All Certificates</button>
        </div>
      `;
      emptyState.style.display = 'block';

      const clearBtn = emptyState.querySelector('.clear-search-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          updateDisplay('');
          searchInput.focus();
        });
      }
    } else {
      emptyState.style.display = 'none';
    }
  }

  searchInput.addEventListener('input', (e) => {
    updateDisplay(e.target.value);
  });

  // Initial counter
  updateDisplay('');
}

// Interactive Lightbox / Modal for Preview
function openPreviewModal(cert, isPdf) {
  let modal = document.getElementById('cert-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'cert-modal';
    modal.className = 'cert-modal-overlay';
    document.body.appendChild(modal);
  }

  const previewBody = isPdf
    ? `<iframe src="${cert.path}" class="modal-pdf-frame" title="Certificate for ${escapeHtml(cert.name)}"></iframe>`
    : `<img src="${cert.path}" alt="Certificate for ${escapeHtml(cert.name)}" class="modal-img" />`;

  modal.innerHTML = `
    <div class="cert-modal-box">
      <div class="cert-modal-header">
        <div class="modal-title">
          <h3>${escapeHtml(cert.name)}</h3>
          <span>Certificate Preview</span>
        </div>
        <button class="cert-modal-close" aria-label="Close preview">&times;</button>
      </div>
      <div class="cert-modal-body">
        ${previewBody}
      </div>
      <div class="cert-modal-footer">
        <a href="${cert.path}" download="${cert.filename}" class="download-btn">
          <i class="fa-solid fa-download"></i> Download Certificate
        </a>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  };

  const closeBtn = modal.querySelector('.cert-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', onKeyDown);
    }
  };
  document.addEventListener('keydown', onKeyDown);
}

// Setup smooth scrolling for the "Download Your Certificate below" banner cue
function setupSmoothScroll() {
  const downloadBelow = document.querySelector('.download_below');
  if (downloadBelow) {
    downloadBelow.style.cursor = 'pointer';
    downloadBelow.addEventListener('click', () => {
      const target = document.querySelector('.search_bar') || document.querySelector('.certificate') || document.querySelector('.certiicate');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCertificates);
} else {
  initCertificates();
}
