const axios = require('axios');
const fs = require('fs-extra');

const models = [
	"1. A-Zovya RPG Artist Tools V4",
	"2. ReV Animated v1.2.2-EOL",
	"3. Babes Babes 3.0",
	"4. AlbedoBase XL v1.3",
	"5. majicMIX realistic 麦橘写实 v7",
	"6. Indigo Furry mix v95_realistic",
	"7. AniVerse V1.5 - Pruned",
	"8. Hassaku (hentai model) v1.3",
	"9. Perfect World 完美世界 v6 (Baked)",
	"10. majicMIX fantasy 麦橘幻想 v3.0 vae",
	"11. NeverEnding Dream (NED) v1.22 baked vae",
	"12. SDXL Turbo Unstable Diffusers ☛ YamerMIX V10 TURBO EDITION",
	"13. Dark Sushi Mix 大颗寿司Mix 2.25D",
	"14. RealCartoon3D V11",
	"15. MeinaMix Meina V11",
	"16. PerfectDeliberate v5",
	"17. ZavyChromaXL v3.0",
	"18. epiCRealism Natural Sin RC1 VAE",
	"19. RealCartoon-Realistic V11",
	"20. majicMIX sombre 麦橘唯美 v2.0",
	"21. Ether Real Mix Ether Real Mix 3.1",
	"22. DreamShaper 8",
	"23. MeinaHentai V4",
	"24. BB95 Furry Mix v13.0",
	"25. AbyssOrangeMix2 - Hardcore AbyssOrangeMix2_hard",
	"26. majicMIX lux 麦橘奇幻 v2",
	"27. RealCartoon-Pixar V6",
	"28. Starlight XL 星光 Animated v3",
	"29. ICBINP - I Can't Believe It's Not Photography LCM",
	"30. DreamShaper XL Turbo DPMpp SDE",
	"31. MeinaPastel V6 ( Pastel )",
	"32. Realisian v5.0",
	"33. epiCPhotoGasm Last Unicorn",
	"34. AbsoluteReality v1.8.1",
	"35. AniMesh Animesh-Pruned V2.2",
	"36. Juggernaut Aftermath",
	"37. DarkSun v7b",
	"38. Dark Sushi 2.5D 大颗寿司2.5D v4.0",
	"39. SXZ Luma 0.9X VAE",
	"40. AnyLoRA - Checkpoint bakedVae (blessed) fp16 NOT-PRUNED",
	"41. [Lah] Mysterious | SDXL v4.0",
	"42. Juggernaut XL V 7 + RunDiffusion",
	"43. Copax TimeLessXL - SDXL1.0 V8",
	"44. Analog Madness - Realistic model v6.0",
	"45. 【Checkpoint】YesMix v3.5",
	"46. Realistic Vision V6.0 B1 V6.0 B1 (VAE)",
	"47. AniMerge V2.5",
	"48. AingDiffusion v13",
	"49. DynaVision XL - All-in-one stylized 3D SFW and NSFW output, no refiner needed! Release_0.5.5.7.BakedVAE",
	"50. ProtoVision XL - High Fidelity 3D / Photorealism / Anime / hyperrealism - No Refiner Needed Release_0.6.3.0.BakedVAE",
	"51. CyberRealistic V4.1 'Back to Basics'",
	"52. DucHaiten-AIart-SDXL v2.0",
	"53. Kizuki - Anime / Hentai Checkpoint Anime / Hentai - V3",
	"54. Mistoon_Anime v2.0",
	"55. Noosphere v4",
	"56. Virile Reality V3.0 BETA 3",
	"57. Lucky Strike Mix 可爱女人Lovely Lady V1.05",
	"58. richyrichMix richyrichMix-v2.fp16",
	"59. NightVision XL - Photorealistic | Portrait | Photography | Hyperreal | Architecture | Interior Design - No refiner needed! V0.7.9.1.BakedVAE",
	"60. Arthemy Comics v6.0",
	"61. MeinaUnreal V4.1",
	"62. Sardonyx REDUX v3.0",
	"63. 万象熔炉 | Anything V5/Ink ink",
	"64. RealCartoon-XL V5",
	"65. Kotosmix V1.0",
	"66. RealCartoon-Anime V8",
	"67. Colorful v3.1",
	"68. YiffyMix v36",
	"69. Pastel-Mix [Stylized Anime Model] Pastel-Mix [Pruned FP16]",
	"70. Sweet-mix v2.2-flat",
	"71. Clarity Clarity 3",
	"72. blue_pencil-XL v2.0.0",
	"73. RealVisXL V2.0 V2.0 (BakedVAE)",
	"74. Blazing Drive _V12g",
	"75. RPG v5",
	"76. RaemuMix v7.2",
	"77. FaceBombMix v1_bakedVAE",
	"78. Colossus Project XL (SFW&NSFW;) v5.3_trained",
	"79. SDVN7-NijiStyleXL v1",
	"80. Experience Experience v10",
	"81. Corneo's 7th Heaven Mix v2",
	"82. LEOSAM's HelloWorld SDXL Base Model HelloWorld SDXL 2.0",
	"83. Flat-2D Animerge v4.0",
	"84. ⋅ ⊣ Realities Edge XL ⊢ ⋅ LCM+SDXLTurbo! ?? TURBO XL",
	"85. ??SDXL FaeTastic?? v2.0",
	"86. LazyMix+ (Real Amateur Nudes)  v3.0b",
	"87. FaeTastic FaeTastic Version 2",
	"88. SDXL_Niji_Special Edition SDXL_Niji_SE",
	"89. AAM - AnyLoRA Anime Mix - Anime Screencap Style Model v1",
	"90. JAM (just another merge) v2.0b_bakedvae_pruned",
	"91. Meichidark_Mix MeichiDark_V4.5",
	"92. majicMIX reverie 麦橘梦幻 v1.0",
	"93. FenrisXL FenrisXL V16.4fp16",
	"94. Consistent Factor (Euclid) Euclid (v6.1)",
	"95. Comic Babes v1",
	"96. Cartunafied v3",
	"97. Kohaku-XL beta beta7",
	"98. FluffyRock e184-vpred-e157",
	"99. PerfectDeliberate-Anime v1.0",
	"100. PicX 1.0",
	"101. NewRealityXL ✔1.3_bkdVAE",
	"102. Hardcore - Hentai v1.2 [baked VAE]",
	"103. fCAnimeMix - fC: 动漫 (Anime) fcAnimeV4",
	"104. seizaMix v2",
	"105. SDXL Yamer's Realistic ?‍? NSFW & SFW V4 + VAE",
	"106. The Truality Engine The Truality Engine V3",
	"107. CarDos Animated v3.0",
	"108. AbyssOrangeMix2 - NSFW AbyssOrangeMix2_nsfw",
	"109. Ether Blu Mix Ether Blue Mix 6",
	"110. SD XL v1.0 VAE fix",
	"111. HARD HARDER",
	"112. SDXL Yamer's Anime ??? Ultra Infinity Y's Anime V5 + VAE",
	"113. Kenshi 01",
	"114. MeinaAlter V3",
	"115. Art Universe v8.0",
	"116. KayWaii v8.0",
	"117. SDVN6-RealXL Detailface",
	"118. DevlishPhotoRealism SDXL SDXL 1.5",
	"119. majicMIX horror 麦橘恐怖 v1",
	"120. Goofball Mix v2-baked",
	"121. BeautyFool v3.0",
	"122. The Ally's Mix III: Revolutions V1.0",
	"123. Koji v2.1",
	"124. CalicoMix v7.5",
	"125. Virile Fusion v3.0 BETA 1",
	"126. AnReal v2.0",
	"127. iCoMix iCoMix V05",
	"128. Matrix-Hentai-Plus v3.5",
	"129. KoreanStyle2.5D KoreanStyle2.5D Baked VAE fp16",
	"130. Aurora v1.0",
	"131. Galena Blend v1.2",
	"132. Rabbit v7",
	"133. CyberRealistic Classic Classic V2.0",
	"134. CamelliaMIx_2.5D V3",
	"135. 3D Animation Diffusion v1.0",
	"136. BrightProtoNuke(BPN) - No refiner needed BPN1.3",
	"137. [SDXL] RongHua | 容华 | 国风大模型 v4.0",
	"138. TheAlly's Mix IV: Verisimilar v1.0",
	"139. WyvernMix (1.5 & XL) XL v1.8",
	"140. Grapefruit (hentai model) grapefruitV4.1",
	"141. BreakDomainXL _V06d",
	"142. RaesanMix v4.1",
	"143. XL6 - HEPHAISTOS  SD 1.0XL (SFW&NSFW;) v3.31_BF16_Experimental",
	"144. AbyssOrangeMix2 - SFW/Soft NSFW AbyssOrangeMix2_sfw",
	"145. Reproduction | SDXL 2v1.2",
	"146. WoW_XL v2 v2",
	"147. Anime Pastel Dream Soft - baked vae",
	"148. realspice v2.0",
	"149. Cherry Picker XL v2.7",
	"150. rMadArt v11.0",
	"151. Pika's New Generation v2.0",
	"152. HomoFidelis v2.0",
	"153. Sardonyx Blend v1.2",
	"154. Anime Art Diffusion XL alpha3",
	"155. PixelWave 05",
	"156. blue_pencil v10",
	"157. NeatNess Fluffy Fur Mix Zephyr",
	"158. Night Sky YOZORA Style Model YoZoRa-V1-origin",
	"159. Crystal Clear XL CCXL",
	"160. architecture_Exterior_SDlife_Chiasedamme v4.0  Exterior",
	"161. Kawaii Realistic European Mix v0.4",
	"162. Serenity v2.0 SafeTensors",
	"163. Dreamscapes & Dragonfire - NEW! - V2.0! - (SEMI-REALISM FANTASY MODEL) DS&Dv2;.0",
	"164. Anything V3 fp16",
	"165. Better than words v3.0",
	"166. CarDos Anime v2.0",
	"167. RunDiffusion XL beta",
	"168. Incredible World v4.0",
	"169. RealHotSpice v1.5",
	"170. Anime Illust Diffusion XL v0.52",
	"171. XenoGASM (NSFW Semi-Real Portraits and Fetishes) v5",
	"172. Nyan Mix 230303_absurd2",
	"173. StingerMix v4.0",
	"174. Sudachi v1.0",
	"175. OnlyAnime |《唯》· 炫彩动漫 v2 追光",
	"176. RunDiffusion FX Photorealistic v1.0",
	"177. AnythingElse V4 v4.5",
	"178. AnyLoraCleanLinearMix-ClearVAE v1.0",
	"179. SDXL MergeHeaven ? ??? ???? ????! Beta m15",
	"180. Yuzu v1.1",
	"181. DonutHoleMix 甜甜圈 v1.0",
	"182. Toonify Remastered",
	"183. BriXL | A must in your toolbox v5 - End of the Line",
	"184. OnlyRealistic | 《唯》· 超高清真人写实 v30 Baked VAE",
	"185. Paragon V1.0 V1.0 (VAE)",
	"186. MengX_Mix_Real V3",
	"187. CamelliaMix_Line V2",
	"188. architecture_Interior_SDlife_Chiasedamme_V8.0 v8.0",
	"189. Realism from HaDeS v8.1 HQ",
	"190. Anime Model OtakuReliableEnable (AMORE) Amore",
	"191. OrangeMixs AbyssOrangeMixs2_sfw",
	"192. Limbo Mix v2",
	"193. Coma v2",
	"194. MagMix v9.0",
	"195. DarkPhoenix 3D v1.2",
	"196. SereneXL v1.5",
	"197. UniverseStable v8.0",
	"198. MixTape /// Blues v3.0 Soul Baked VAE",
	"199. CamelliaMix V3",
	"200. RealLife v3.0",
	"201. SDXL YAMER'S PERFECT DESIGN ? V5 Special Gift",
	"202. AutoD4-Style v2.5",
	"203. FurtasticV2.0 FurtasticV2.0",
	"204. RaenaMix v4.1",
	"205. AyoniMix AyoniMix V6",
	"206. Async's MIX v5",
	"207. HRL v4.0",
	"208. NabiMix V2",
	"209. Am i Real AmIReal V4.2",
	"210. BlazingRealDrive _V02h",
	"211. Real Dream 8 (Legendary)",
	"212. HeavenOrangeMix v2_3",
	"213. Mistoon_Sapphire v2.0",
	"214. NextPhoto v3.0",
	"215. Dream2Reality v1.0",
	"216. CalicoMix DangerousCute DC v4.0",
	"217. PFG 1.11 Safetensors",
	"218. fennfoto ff2",
	"219. SDXL Yamer's Realism! - Realistic/Anime/3D Version 3",
	"220. Bambi Eyes v1.0+VAE",
	"221. Melange Melange1.0f",
	"222. epiCDream Lullaby",
	"223. VivCharMix ViVCharMix_V5 New Era",
	"224. Sexy Toon 3D v2.1 - More Sexy",
	"225. Dungeons N Waifu's - v2.2 - (2.5D FANTASY MODEL) Dungeons N Waifu's 2.2 - FULL",
	"226. BlueBoys_2D v3.0",
	"227. PornMaster-Anime V3",
	"228. majicMIX alpha 麦橘男团 v2.0",
	"229. FormulaXL - 公式XL (ComfyUI) v2.0_Pruned",
	"230. MCBS - MachineCode's Comic Book Style v3",
	"231. EthernalDope v1.0",
	"232. RestlessExistence v3.0-Reflection",
	"233. Kawaii Realistic Anime Mix A0.4",
	"234. DeepBlue XL v0.4.1",
	"235. Hassaku XL (sfw&nsfw;) beta beta V0.1",
	"236. 【Checkpoint】YesMix (fp16/cleaned) 2.0",
	"237. ExpMix_Line V3",
	"238. BetterBoys2.5D v6.0",
	"239. epiC2.5D v1.0",
	"240. AnythingQingMix v3.0",
	"241. Omnium v1.1",
	"242. IdentityCrisis EroDemonMix_0.3ws",
	"243. SDXL Yamer's Cartoon Arcadia ??✨ V2",
	"244. MixTape /// Funk v3.0 Proibidão Baked VAE",
	"245. 0001SoftRealistic v154xxx",
	"246. ZemiHR V2",
	"247. XenoEngine - An Art Style Mega Model v4.8",
	"248. Real Moon v9.0",
	"249. SDXL Yamer Grimlock SINGULARITY ??? SFW + NSFW Void",
	"250. ZavyMix v1.0",
	"251. Furryrock furryrock v_7.0",
	"252. Inkpunk Diffusion v2",
	"253. hello25DVintageAnime hello25DVintageAnime_v2.5",
	"254. Synergix v1.0",
	"255. PornMaster-Amateur PBM-V1-FULL-inpainting",
	"256. LusterMix v2.0 - SemiRealism",
	"257. Something v2.2",
	"258. Ultrium V6.0.SDXL.VAE.FLT32 Ultrium V6.0.SDXL.VAE.FLT",
	"259. YogiriMix v1.0",
	"260. UnstableInkDream v8.0-balance-V3",
	"261. Ivory v2",
	"262. MonsterCoffeeBang! Mix v1.1 No VAE",
	"263. FiaMix++ H (NSFW) v5.0",
	"264. architecture_Exterior_SDlife_Chiasedamme_V6.0 v6.0",
	"265. Merged amateurs Amateur life",
	"266. Opiate Opiate.v3.0",
	"267. AingEXP EXP-12",
	"268. Redwater Redwater",
	"269. Find&ForgetYou; v2.0",
	"270. ChimeraMi(XL) v3.5",
	"271. CarDos XL v1.0",
	"272. RunDiffusion FX 2.5D v1.0",
	"273. Acorn Is Spinning AcornXL V2",
	"274. MinaiMix v2.0",
	"275. Perfect World 完美世界 (fp16/cleaned) 6.0",
	"276. Unstable Homoerotic Diffusion (UHD) v1.11",
	"277. Doomer Boomer v1.0",
	"278. FurryToonMix v1.0",
	"279. Unreal Realism v4.0",
	"280. ZHMix-Dramatic v3.0",
	"281. VinteProtogenMix VinteProtogenMix V2.0",
	"282. MixTape /// Bossa Nova v2.0 Nova Baked VAE",
	"283. CopaxTimeless copax timeless bright V2",
	"284. Jib Mix Realistic XL v5.0 Better Eyes and NSWF",
	"285. SomMix v1.0",
	"286. Muses - Erato v4.0",
	"287. Stygian Mix v11.5",
	"288. Honey 2D v3.0",
	"289. RealCartoon - Special SP1",
	"290. Jucy666 v3",
	"291. architecture_Urban_SDlife_Chiasedamme_V6.0 v6.0",
	"292. helloYoung25d helloYoung25d_v1.0f",
	"293. HMen Mix v2.5",
	"294. a7b3 v1.0",
	"295. 7 of 9 - JoyBringer Edition v4 JoyBringer",
	"296. helloRealistic helloRealistic_v1.1",
	"297. Little Monsters Anime",
	"298. JernauMix Chimera (v3.0)",
	"299. Gleipnir v2.0 (BF16)",
	"300. Nothing Nothing V2.4",
	"301. _CHEYENNE_ v1.2",
	"302. BoyFusion 0.9",
	"303. PicX_cute 1.0",
	"304. WaffleMix V7 Wafflethorn",
	"305. SDVN5-3DCuteWave v1.0",
	"306. SnoutMix v5.0",
	"307. architecture_Interior_SDlife_Chiasedamme_V9.0 v9.0",
	"308. architecture_Exterior_SDlife_Chiasedamme_V9.0 v9.0",
	"309. HIJKLMix 2.5D v3.0_pruned",
	"310. RealCartoon - 2.5D v1.0",
	"311. EasyFluff V10-PreRelease",
	"312. Three Delicacy Wonton (三餡馄饨Mix) V2",
	"313. AnRealSpiceMix v2.0",
	"314. Terror Models Complete V4 HELL WALKER",
	"315. Nightmare Shaper V3 Flesh Eater",
	"316. Kohaku-XL alpha nyan",
	"317. Toon Babes v1.0",
	"318. Coconut furry mix 2 Coconut2.0.Av3_hardlines",
	"319. DiscoMix [anime] v1",
	"320. MixTape /// Rock n' Roll v3.0 Punk Rock Baked",
	"321. Paradox SD XL 1.0 Paradox SD XL 1.0",
	"322. WinterMoonMix 冬之月 WinterMoonMix-A",
	"323. ColorfulXL v1.7",
	"324. Dragonfruit (Unisex Model) DragonfruitGT v1.0",
	"325. RaekanaMix 2.5D v2.0",
	"326. XenoREALITY v2.0",
	"327. EnvyMix v1.2",
	"328. PornMaster-Pro AsianV2-fix",
	"329. yayoi_mix v2.5",
	"330. LimeREmix_MOJITO v4.0",
	"331. helloComic helloComic_v12c",
	"332. FurryArt F.A_GU",
	"333. Kawaii Realistic Asian Mix v0.6",
	"334. CookieCutter Clear v4.5",
	"335. ManlyAlpha v1.0",
	"336. PhotoSomnia Omega",
	"337. HomoVeritas v2.0",
	"338. AIOMonsterGirls AIOMonstergirlsV4",
	"339. [PVC Style Model]Movable figure model v2.0(Civitai Edition)",
	"340. TameheadMix v0.51",
	"341. 7th Heaven Mix (fp16/cleaned) 2.0",
	"342. Tenki Hybrid v2.0",
	"343. QteaMix 通用Q版模型 Omega-fp16",
	"344. Xpero End1ess Model v1",
	"345. AngrA RealFlex v6.0F",
	"346. Color Box Model COLOR BOX",
	"347. Virile Animation v1.0",
	"348. OwnWaifu_Real3dmix v1.0",
	"349. NextGenMix R5-BakedVAE",
	"350. dual_personality dual_eee",
	"351. SARENAmix v4.0",
	"352. Objective Reality v2.0",
	"353. Luna Mia v5.0BakedVAE_AutomaticFIX",
	"354. Liberty LibertyMain",
	"355. Mistoon_Amethyst v2.0",
	"356. Realistic Fantasy v2.0",
	"357. Virile Motion v2.0",
	"358. DeepBoys_2.5D v3.0",
	"359. VisualNovel V1",
	"360. verisimilitude verisimilitudeV2",
	"361. SDXXXL v3.0",
	"362. AddictiveFuture Realistic SemiAsian V1",
	"363. hellokid2d hellokid2d_v1.52g",
	"364. lametta v20.12",
	"365. AnyOrangeMix - Anything + AbyssOrangeMix 5 + 4.5 + 3A1B + 3A3",
	"366. Paradox 2 SD XL 1.0 Paradox 2 SD XL 1.0",
	"367. UltimateDiffusionXL v0.2",
	"368. hellomecha hellomecha_v10 Beta",
	"369. Neurogen v1.1 v1.1",
	"370. CaramelApple v1.2",
	"371. Realism Engine SDXL v2.0 VAE",
	"372. RealBiter v1.0",
	"373. Daiquiri Anime v1.2.2 Pruned",
	"374. Non Plus Ultra FINAL v2.0",
	"375. DuskTideMix 暮潮 v1.0",
	"376. RealMix XL v1.0",
	"377. Realism CE Revolution v1.0",
	"378. blue_pencil_realistic v1",
	"379. ALLBoyMix v2.0",
	"380. AstreaPixie Radiance v1.6",
	"381. Muses - Euterpe v4.0",
	"382. hellokid25D hellokid25d_v1.5j",
	"383. LimitlessVision v2.0",
	"384. Epic Diffusion Epic Diffusion 1.1",
	"385. Milky Wonderland v2.0",
	"386. fCBlendMix - fC: 现实主义 (Realism) fcBlend3 (Realism)",
	"387. HIJKLMix v4.0_pruned",
	"388. architecture_Interior_SDlife_Chiasedamme_V7.0 v7.0",
	"389. ThinkDiffusionXL v1.0",
	"390. _MOHAWK_ v1.8",
	"391. epi_2.5Dphotogodess v3",
	"392. kisaragi_mix v2.2",
	"393. REALISM_BY_STABLE_YOGI v3.0",
	"394. FiaMix Reboot H (NSFW) V5.0",
	"395. PastelBoys_2D v3.0",
	"396. XtReMiX UltiMate Merge v1.8",
	"397. diamond.visual.XL v25",
	"398. UGARIT | MERGE V5_Palestrom",
	"399. Iris Lux (polyvalent prototype/realistic/sfw/art/nsfw/porn/no refiner needed) v289 (VAE included)",
	"400. Cornflower - Stylized Anime and Hentai Model 11",
	"401. BBMIX-ANIMEMIX v3.0",
	"402. fitCorderMix - 4 - 女性健身 (Bodybuilding) v4 Photoreal",
	"403. SonicDiffusion V4",
	"404. [Umi AI] Macross v2 v2",
	"405. RCNZ Cartoon 3d v2.0",
	"406. pop-popcorn-mix pop-popcorn-mix",
	"407. HASDX HasedSDX",
	"408. The Talos Project v1.1",
	"409. Mizu Mixes MizuMixV10",
	"410. Pyro's NSFW SDXL v0.4",
	"411. Western Animation Diffusion v1",
	"412. NijiDiffusedMix v4.0",
	"413. kidsMIX v1.0",
	"414. Matrix-Hentai-Toon v1.3-BETA-VAE",
	"415. OrangeCocoa 50/50 Mix 1.1.0",
	"416. BismuthMix v6.0",
	"417. DisillusionMix 幻灭 DisillusionMix3",
	"418. bot_realisic_soeasy_Girlface all-in-one v1.0",
	"419. BBMIX-ANICUTE v4.0",
	"420. ChameleonAI 'RPG' Mix v1.0",
	"421. architecture_Interior_SDlife_Chiasedamme_V6.0 v6.0",
	"422. SDVN8-ArtXL base",
	"423. Euclase Blend v1.2",
	"424. Fluffy Fluffy V2.5",
	"425. BrainDance _BD071",
	"426. DucHaiten-Niji-SDXL v0.4",
	"427. SDXL_fixedvae_fp16(Remove Watermark) base_fxied_vae_V2_fp16",
	"428. RFKTR's Darkdream v4",
	"429. Mistoon_Emerald v2.0",
	"430. PastelDiffusedMix V2.2",
	"431. PhotoPedia XL 4.5",
	"432. fuduki_mix v1.5",
	"433. helloFlatArt helloFlatArt_v1.2a",
	"434. SynthwavePunk V2",
	"435. KuromiMix KuromiMix_v2.0",
	"436. Meichidark_Mix (fp16/cleaned) 4.5",
	"437. CuteHeaven v2.0",
	"438. Falkons (Anime and Hentai) v1.3",
	"439. Waifu's N Dungeons - v2.0 - (ANIME FANTASY MODEL) Waifu's N Dungeons - v2.0",
	"440. Model-EX v4.0",
	"441. AsianRealistic_SDLife_Chiasedamme v4.0",
	"442. BABES_BY_STABLE_YOGI v1.0 PRUNED",
	"443. Peefusion Peefusion_v2",
	"444. Domesticated Mix V1.5",
	"445. TalmendoXL - SDXL Uncensored Full Model v1.1-Beta",
	"446. Prefix Real Cart v1.0",
	"447. ANIME CARTOON v1.0",
	"448. VNDoll_Realmix v1.0",
	"449. helloCartoonFilm helloCartoonFilm_v3.0p",
	"450. SleeplessMix v1.0",
	"451. helloimpasto helloimpasto_v3.5a",
	"452. matureMILF+mix +",
	"453. RoXL v1.0",
	"454. The WonderMix V9",
	"455. hellopure hellopure_v3.5g",
	"456. schoolmax 2.5d 11",
	"457. DuelAnimeMix v1",
	"458. CandyApple v1.2",
	"459. surisurisitai v1.0",
	"460. Copax Cute XL - SDXL1.0 v3",
	"461. CamelliaMix_NSFW V1.1",
	"462. The Ally's Mix X - SDXL v1.0",
	"463. Real Moon - Anime v10.0",
	"464. CineVisionXL by SoCalGuitarist - Easily create cinematic movie scenes in widescreen (4:3,16:9,21:10) formats! Release-v1.5.0-BakedVAE",
	"465. Melancholic v2.0",
	"466. Sexy Toons feat. Pipa v1.0",
	"467. MengX_Mix_Fantasy V3",
	"468. Anime-Babes-Bigger (ABB) ABB_AnimeBiggerBabesv2.0",
	"469. +RealisticMix666+ v2.0",
	"470. Ametrine REDUX v3.0",
	"471. Perceptron v2.0",
	"472. 0.7yesmix_0.3sweetMix v2.0",
	"473. AnythingQingMix-Realistic v1.0",
	"474. CinEro XL | Photomatic Cinegraphy - Moody Creative Cinematic v1.3a Xeno HandSome",
	"475. hello25D Anime hello25DAnime_v2.0",
	"476. helloFlatAnime helloFlatAnime2D_v1.2d",
	"477. RFKTR's Speedpainting v3",
	"478. YetAnotherAnimeMix V6 [VAE]",
	"479. AstreaPixie Radiance Hentai v1.6",
	"480. ZHMix-Realistic v3.0",
	"481. SDVN3-RealArt v1",
	"482. Euphostain v1.0",
	"483. OhMen Origins OhMen Origins v1",
	"484. Hardcore - Asian Porn v2.0",
	"485. Bondage-v11 v11",
	"486. GTA5 Artwork Diffusion V1",
	"487. Analog Diffusion 1.0 safetensors",
	"488. Project Unreal Engine 5 v3.0",
	"489. Ikigai SR v2.0",
	"490. Transformix v1.0",
	"491. knollingcase V1",
	"492. FFXL400(GB) XL Combined LoRAs v3.0-beta",
	"493. helloPopArt25D helloPopArt25d_v1.3d",
	"494. Cheese Daddy's Landscapes mix | OFFSET NOISE 3.5 FP16",
	"495. ANGRA ? SDXL 1.0 v2.2",
	"496. Not-Real-Anime-Style v1.5",
	"497. Radiant Vibes",
	"498. Project KR4X - 2.5D / AaYMix V4",
	"499. DreamlabsOil_v2 v2",
	"500. SCMix SCMix",
	"501. AngrA nim v2.0",
	"502. Mol_Keun Furry Mix V6.0",
	"503. CGN Gradient Photo v1.2",
	"504. line and light v1.0",
	"505. NewdawnXL NewdawnXL3.1 bf16 Version",
	"506. Fluffy Universe (Furry) Fluffy Universe 1.0",
	"507. SAV MIX v6.2",
	"508. SirenMix SirenMixV1-pruned-fp16",
	"509. Capability XL v1.0",
	"510. Minima V2B",
	"511. RFKTR's DarkMix v2.0-fp16-noEMA",
	"512. Openjourney Openjourney-v4",
	"513. SDXL HK v0.9",
	"514. ZavyYumeXL v1.0",
	"515. helloJPLassie helloJPLassie_v2.1",
	"516. Sweet-mix (fp16/cleaned) 2.1",
	"517. epi_hyperphotogodess v1 - CLIP fix",
	"518. TypeB v0.3a",
	"519. Furation Grapefruit",
	"520. Sassy Girls 1.1",
	"521. CutifiedAnimeCharacterDesign SDXL v1.0",
	"522. Realism from HaDeS XL v1.5B",
	"523. AI Beast Mix v1.7",
	"524. AstreaPixie XL Anime v1.6",
	"525. hellonijicute25d hellonijicute25d_v1.0b",
	"526. LemonTea mix - painterly 2.5D v1",
	"527. Ninja V1",
	"528. VirtuousMix v1.0",
	"529. Stoked Reality v2.2",
	"530. helloYoung2D helloYoung2D_v1.2g",
	"531. susjeloMix susjeloMix-bakedVae",
	"532. SDVN2-RealRPG v1",
	"533. JitQ v3.0",
	"534. RaetoonMix v2.0",
	"535. AnythingFurry 1",
	"536. ANINDE mix vASI 2.0",
	"537. Newdawn newdawnv7.4Jötunheimr",
	"538. Fluffusion R1",
	"539. fCRadianceApex - 頂点美術 - Radiance Collection - fCRadianceApex-V2",
	"540. Virile Fantasy v1.1",
	"541. Unstable Barbie v1.0",
	"542. YORU CAT YoruCat v2024",
	"543. helloFlatColorful2D helloFlatColorful2D_v1.5e",
	"544. MonsterCoffeePrime! Mix v1.0 No VAE",
	"545. senHentai v1.2",
	"546. Deliberate for Invoke v0.8",
	"547. Cartoon Style CartoonStylev0.2",
	"548. Sexy Toon Real World v1.0",
	"549. FiaMix Reboot v6.4",
	"550. OmnigenXL (NSFW & SFW) v1.0",
	"551. 7PAG - NSFW Merged Model 7PAG-LSCX",
	"552. DevlishPhotoRealism 