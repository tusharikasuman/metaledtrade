// Each product is shown on /products as bullet points:
//   sizes     – one bullet per size (optional)
//   thickness – shown on its own line under the sizes (optional)
//   grades    – one bullet per grade
//   extras    – "Also available" bullets under the grades (optional)

const STRUCTURAL_GRADES = [
  "EN 10025 S275JR",
  "EN 10025 S355JR",
  "EN 10025 S355J0",
  "S35A36",
  "ASTM A572 Gr.50",
  "ASTM A992",
];

const EUROPEAN_SECTION_GRADES = ["EN 10025 S275JR", "EN 10025 S355JR", "EN 10025 S355J0", "S35Gr.50"];

const JAPANESE_BEAM_GRADES = ["EN 10025 S275JR", "ASTM A36", "ASTM A572 Gr.50", "ASTM A992", "SS400", "Q235B"];

const ANGLE_GRADES = ["ASTM A36", "ASTM A572 Gr.50", "ABS Grade A", "S275JR", "S355JR", "SS400"];

const BAR_GRADES = ["ASTM A36", "SS400", "S275JR"];

const HOT_ROLLED_GRADES = ["S235JR", "S275JR", "ASTM A36", "JIS G3101 SS400", "ST37.2", "SAE 1015"];

const AS_PER_ENQUIRY = ["Other grades as per enquiry"];

export const longProducts = [
  // Featured from Image 1
  {
    product: "Hot Rolled I-Beams",
    sizes: ["HEA 100 to HEA 1000"],
    grades: ["European Standard S355", "S355JR", "ASTM A572"],
  },
  {
    product: "Seamless Steel Pipes",
    sizes: ['1/2" to 24" NB'],
    grades: ["Grade B", "X42", "X52", "ASTM A106", "API 5L"],
  },
  {
    product: "Reinforcing Bars",
    sizes: ["8mm to 40mm diameter"],
    grades: ["High Tensile Steel", "BS 4449", "Grade 500B"],
  },
  // Table from Images 2-3
  {
    product: "Universal Beam",
    sizes: ["UB 127x76 to 1016x305"],
    grades: STRUCTURAL_GRADES,
  },
  {
    product: "Universal Column",
    sizes: ["UC 152x152 to 356x406"],
    grades: STRUCTURAL_GRADES,
  },
  {
    product: "American Wide Flange Beams",
    sizes: ["W.S. 04x04 to W.S. 36x16.5"],
    grades: STRUCTURAL_GRADES,
  },
  {
    product: "W Sections",
    sizes: ["W.S. 04x04 to W.S. 36x16.5"],
    grades: STRUCTURAL_GRADES,
  },
  {
    product: "Japanese H Beams (JHS)",
    sizes: ["100x100 to 400x400"],
    grades: JAPANESE_BEAM_GRADES,
  },
  {
    product: "Japanese I Beams (JIS)",
    sizes: ["150x75 to 900x300"],
    grades: JAPANESE_BEAM_GRADES,
  },
  {
    product: "European Flange Beams",
    sizes: ["HEA 100 to HEA 1000"],
    grades: EUROPEAN_SECTION_GRADES,
  },
  {
    product: "HEA & HEB Sections",
    sizes: ["HEB 100 to HEB 1000"],
    grades: EUROPEAN_SECTION_GRADES,
  },
  {
    product: "European I Beams (IPE Sections)",
    sizes: ["IPE 80 to IPE 750"],
    grades: EUROPEAN_SECTION_GRADES,
  },
  {
    product: "British Channels (PFC)",
    sizes: ["100x50 to 430x100"],
    grades: EUROPEAN_SECTION_GRADES,
  },
  {
    product: "European Channels (UPN)",
    sizes: ["UPN 40 to UPN 400"],
    grades: EUROPEAN_SECTION_GRADES,
  },
  {
    product: "Japanese Channels (JIS)",
    sizes: ["75x40 to 380x100"],
    grades: ["EN 10025 S275JR", "EN 10025 S355JR", "ASTM A572 Gr.50", "ASTM A36", "SM 490A", "SS400"],
  },
  {
    product: "Equal Angles",
    sizes: ["25x25 to 250x250"],
    thickness: "2mm to 25mm",
    grades: ANGLE_GRADES,
    extras: AS_PER_ENQUIRY,
  },
  {
    product: "Unequal Angles",
    sizes: ["75x50 to 200x100"],
    thickness: "5mm to 15mm",
    grades: ANGLE_GRADES,
    extras: AS_PER_ENQUIRY,
  },
  {
    product: "Flat Bars",
    sizes: ["25mm to 250mm"],
    grades: BAR_GRADES,
    extras: AS_PER_ENQUIRY,
  },
  {
    product: "Square Bars",
    sizes: ["8mm to 60mm"],
    grades: BAR_GRADES,
  },
  {
    product: "Shafting / Round Bars",
    sizes: ["6mm to 200mm"],
    grades: BAR_GRADES,
  },
  {
    product: "Deformed / Reinforcement Bars",
    sizes: ["8mm to 40mm"],
    grades: ["BS 4449 Gr.460B", "ASTM A615 Gr.40", "ASTM A615 Grade 60"],
  },
  {
    product: "Steel T Bars",
    sizes: ["40x40x5 to 50x50x5"],
    grades: ["ASTM A36", "S275JR"],
  },
  {
    product: "Billets & Blooms",
    sizes: [
      "85mm x 85mm",
      "100mm x 100mm",
      "120mm x 120mm",
      "130mm x 130mm",
      "140mm x 140mm",
      "150mm x 150mm",
      "200mm x 200mm",
    ],
    grades: ["3SP", "4SP", "5SP", "ASTM Grade 40", "ASTM Grade 60"],
  },
];

export const flatProducts = [
  // Featured from Image 1
  {
    product: "Cold Rolled Sheets",
    thickness: "0.5mm to 3.0mm",
    grades: ["Deep Drawing Quality", "DC01", "ASTM A1008"],
  },
  {
    product: "Galvanized Coils",
    sizes: ["1219mm width", "1250mm width"],
    grades: ["Commercial G90", "DX51D", "Z275"],
  },
  {
    product: "Stainless Steel Plates",
    thickness: "Up to 25mm",
    grades: ["316L Marine Grade", "SS316", "SS304"],
  },
  // Table from Image 4
  {
    product: "Hot Rolled Steel Plates / Sheets",
    sizes: [
      "1219mm x 2438mm",
      "1.5 Meter to 6 Meter",
      "2 Meter x 6 Meter",
      "2.5 Meter x 8 Meter",
      "2.5 Meter x 10 Meter",
      "2.5 Meter x 12 Meter",
      "3 Meter x 12 Meter",
      "2438mm x 6096mm",
    ],
    thickness: "1.2mm to 150mm",
    grades: [
      "EN S275JR or higher grades as per requirement",
      "ASTM A36 or higher grade as per requirement",
      "JIS G3101 SS400 or higher as per requirement",
    ],
    extras: [
      "Other similar grades in BS, IN and CN as per final enquiry",
      "Third Party Inspection (optional)",
      "MTC 3.1 or 3.2 certification with CE marking",
    ],
  },
  {
    product: "Hot Rolled Steel Coils",
    sizes: ["1219mm wide", "1.5 Meter wide", "2 Meter wide"],
    thickness: "1.2mm to 22mm",
    grades: [
      "S235JR",
      "S275JR",
      "ASTM A36",
      "JIS G3131 SPHC or higher",
      "JIS G3132 SPHT1 or higher",
      "SAE 1006 or higher",
    ],
    extras: ["Higher grades based on final requirement and specifications"],
  },
  {
    product: "Hot Rolled Chequered Plates / Sheets",
    sizes: ["1219mm x 2438mm", "1.5 Meter x 6 Meter", "2 Meter x 6 Meter"],
    thickness: "1.8mm to 12mm",
    grades: [...HOT_ROLLED_GRADES, "JIS G3131"],
  },
  {
    product: "Hot Rolled Chequered Coils",
    sizes: ["1219mm wide", "1.5 Meter wide"],
    thickness: "2mm to 12mm",
    grades: [...HOT_ROLLED_GRADES, "JIS G3132"],
  },
  {
    product: "Steel Plates: High Tensile & Offshore Quality",
    sizes: [
      "1.5 to 2 Meter x 6 Meter",
      "2.5 Meter x 8 Meter",
      "2.5 Meter x 10 Meter",
      "2.5 Meter x 12 Meter",
      "3.05 Meter x 8 Meter",
      "3.05 Meter x 12 Meter",
      "2438mm x 6096mm",
    ],
    thickness: "6mm to 100mm",
    grades: [
      "API 2H Gr.50",
      "API 2W Gr.50",
      "S355EMZ",
      "S355K2+N",
      "S355J2+N",
      "S355J0+N",
      "S355JR",
      "ASTM A572 Gr.50",
      "ASTM A283 Gr.C",
    ],
  },
];
