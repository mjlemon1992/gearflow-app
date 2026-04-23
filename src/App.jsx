import { useState, useEffect, useRef } from "react";

// ── PINS ──────────────────────────────────────────────────────────────
const APP_PIN   = "4702";
const ADMIN_PIN = "2008";

// ── TRANSMISSION DATA ─────────────────────────────────────────────────
const TRANS_DATA = {"68RFE":{label:"68RFE",make:"Dodge/Ram",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Solenoids & Electrical",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},valvebody:{label:"Valve Body & Plates",color:"#ce93d8"},filter:{label:"Filter & Pan",color:"#80cbc4"},hardparts:{label:"Hard Parts",color:"#ff8a65"}},parts:[{id:"68_molar",name:"Molar Overhaul Kit",part:"D72002C",supplier:"KING",category:"overhaul",price:null},{id:"68_bushing",name:"Bushing Kit",part:"DB72030B",supplier:"KING",category:"overhaul",price:null},{id:"68_surecure",name:"Surecure Kit",part:"S72174A",supplier:"KING",category:"overhaul",price:null},{id:"68_piston",name:"Piston Set",part:"72960CK",supplier:"KING",category:"overhaul",price:null},{id:"68_frict_bw",name:"Friction Module Borg Warner",part:"72119A",supplier:"KING",category:"friction",price:null},{id:"68_alto_g3",name:"Power Pack Clutch Kit Alto G3",part:"72101CAHPPK-1",supplier:"KING",category:"friction",price:null},{id:"68_hd_od_ud",name:"HD Friction Module Alto OD/UD",part:"A72102AAHPK",supplier:"KING",category:"friction",price:null},{id:"68_steel",name:"Steel Module",part:"-",supplier:"-",category:"friction",price:null},{id:"68_misc_pp",name:"Misc Pressure Plate",part:"-",supplier:"-",category:"friction",price:null},{id:"68_od_rev",name:"OD-REV Pressure Plate Modified",part:"Modified",supplier:"-",category:"friction",price:30},{id:"68_sol19",name:"Solenoid Body 2019+",part:"72720B",supplier:"KING",category:"electrical",price:null},{id:"68_sol_grey",name:"Solenoid Body Grey",part:"D72420B",supplier:"KING",category:"electrical",price:null},{id:"68_transducer",name:"Transducer Mopar",part:"D72415",supplier:"KING",category:"electrical",price:null},{id:"68_tcc",name:"OS TCC Switch Valve",part:"44912-08K",supplier:"-",category:"electrical",price:null},{id:"68_pump_bg",name:"Pump Body and Gears",part:"DR72500C",supplier:"KING",category:"pump",price:null},{id:"68_pump_gs",name:"Pump Gear Set",part:"A72530B",supplier:"KING",category:"pump",price:null},{id:"68_pump_core",name:"Pump Core (if unrepairable)",part:"-",supplier:"-",category:"pump",price:300},{id:"68_sep_plate",name:"High Pressure Separator Plate",part:"A72747BA-MOD",supplier:"PARTS4",category:"valvebody",price:null},{id:"68_billet_ch",name:"Billet Channel Plate",part:"R72741CHP",supplier:"PARTS4",category:"valvebody",price:null},{id:"68_od_snap",name:"OD Snap Ring Tapered",part:"-",supplier:"-",category:"valvebody",price:null},{id:"68_pan_flt",name:"Pan Filter",part:"A72010BA",supplier:"KING",category:"filter",price:null},{id:"68_spin_flt",name:"Filter Spin-On",part:"72013A",supplier:"KING",category:"filter",price:null},{id:"68_pan_drip",name:"Pan with Drip Plug",part:"A72765AA-Q",supplier:"KING",category:"filter",price:null},{id:"68_deep_pan",name:"Deep Aluminium Pan",part:"A72765BA-Q",supplier:"KING",category:"filter",price:null},{id:"68_tc",name:"Torque Converter",part:"C51HD",supplier:"PARTS4",category:"hardparts",price:null},{id:"68_low_sprag",name:"Low Sprag HD",part:"R72644C",supplier:"PARTS4",category:"hardparts",price:null}]},"6L80E":{label:"6L80E",make:"GM",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Electrical / TECHM",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"6l_overhaul",name:"Overhaul Kit",part:"104002A",supplier:"KING",category:"overhaul",price:null},{id:"6l_friction",name:"Friction Module",part:"104119A",supplier:"KING",category:"friction",price:null},{id:"6l_steel",name:"Steel Module",part:"T104139A",supplier:"KING",category:"friction",price:null},{id:"6l_bushing",name:"Bushing Kit",part:"DB104030A",supplier:"KING",category:"overhaul",price:null},{id:"6l_surecure",name:"Surecure Kit",part:"S104174A",supplier:"KING",category:"overhaul",price:null},{id:"6l_bellhousing",name:"Bell Housing",part:"R104750CB",supplier:"KING",category:"hardparts",price:null},{id:"6l_stator",name:"Machine Stator",part:"-",supplier:"Parkland Machine",category:"hardparts",price:150},{id:"6l_piston",name:"Piston Kit",part:"D104960K",supplier:"KING",category:"overhaul",price:null},{id:"6l_techm",name:"TECHM",part:"CS104420C",supplier:"KING",category:"electrical",price:null},{id:"6l_low_sprag",name:"Low Sprag",part:"A104654",supplier:"KING",category:"hardparts",price:null},{id:"6l_converter",name:"Converter",part:"BU60HD",supplier:"PARTS4",category:"hardparts",price:null},{id:"6l_drum",name:"3-5-R Drum",part:"A104554A",supplier:"KING",category:"hardparts",price:null},{id:"6l_pp456",name:"4-5-6 Pressure Plate",part:"104140A-01",supplier:"KING",category:"friction",price:null},{id:"6l_snaprings",name:"3-Snap Rings",part:"24233406/24240199",supplier:"KING",category:"hardparts",price:null},{id:"6l_pump_rotor",name:"Pump Rotor/Slide Kit",part:"D104531AX",supplier:"KING",category:"pump",price:null},{id:"6l_filter",name:"Filter",part:"A104010A",supplier:"KING",category:"filter",price:null},{id:"6l_35r_piston",name:"3-5-R Apply Piston (Alum)",part:"D104964A",supplier:"KING",category:"overhaul",price:null},{id:"6l_hd456",name:"HD 4-5-6 Apply Plate Kit",part:"104960-01K",supplier:"KING",category:"friction",price:null},{id:"6l_pump_wash",name:"OS Pump Washer",part:"33452A",supplier:"KING",category:"pump",price:null},{id:"6l_clutch_spr",name:"Clutch Select Valve Spring Kit",part:"104740-02K",supplier:"KING",category:"electrical",price:null},{id:"6l_steel6l90",name:"STEEL 6L90 4-5-6",part:"104120",supplier:"KING",category:"friction",price:null}]},"10R80":{label:"10R80",make:"Ford",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},hardparts:{label:"Hard Parts",color:"#ff8a65"},electrical:{label:"Valve Body / Elec",color:"#4fc3f7"},friction:{label:"Friction & Clutch",color:"#f0c040"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"10r_master",name:"Master Kit",part:"MTK132983",supplier:"Cam Clarke",category:"overhaul",price:null},{id:"10r_vb_cc",name:"Valve Body",part:"JL3Z7A100C",supplier:"Cam Clarke",category:"electrical",price:null},{id:"10r_vb_king",name:"Valve Body",part:"D105740A",supplier:"KING",category:"electrical",price:null},{id:"10r_bushing",name:"Bushing Kit",part:"105030",supplier:"KING",category:"overhaul",price:null},{id:"10r_input",name:"Input Shaft",part:"HL3Z7015C",supplier:"Cam Clarke",category:"hardparts",price:null},{id:"10r_cdf_drum",name:"CDF Drum",part:"JL3Z7H351B",supplier:"Cam Clarke",category:"hardparts",price:null},{id:"10r_sun_gear",name:"#3 Sun Gear Shaft (C Clutch Hub)",part:"-",supplier:"-",category:"hardparts",price:null},{id:"10r_filter",name:"Filter",part:"A105010A",supplier:"KING",category:"filter",price:null},{id:"10r_ss_filter",name:"Stop Start Filter",part:"105001A",supplier:"KING",category:"filter",price:null},{id:"10r_converter",name:"Converter",part:"FM140A",supplier:"PARTS",category:"hardparts",price:null},{id:"10r_f_steels",name:"F-Clutch Steels",part:"D105126A",supplier:"KING",category:"friction",price:null},{id:"10r_press_pl",name:"Pressure Plate",part:"-",supplier:"-",category:"friction",price:null},{id:"10r_anod_cyl",name:"Anodized Cylinder",part:"PC3Z7B177A",supplier:"Cam Clarke",category:"hardparts",price:null},{id:"10r_frict_cc",name:"Upgraded Friction Module",part:"105119AB",supplier:"Cam Clarke",category:"friction",price:null},{id:"10r_frict_king",name:"Borg Warner Friction Module",part:"105119AB",supplier:"KING",category:"friction",price:null},{id:"10r_f_bal_pis",name:"F Clutch Balance Piston",part:"HL3Z7H360F",supplier:"Cam Clarke",category:"hardparts",price:null},{id:"10r_plan_d",name:"#3 Planetary D Clutch",part:"HL3Z7D006A",supplier:"Cam Clarke",category:"hardparts",price:null},{id:"10r_sun_d",name:"#3 Sun Gear D Clutch",part:"HL3Z7D063D",supplier:"Cam Clarke",category:"hardparts",price:null}]},"6R140":{label:"6R140",make:"Ford",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Valve Body / Elec",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"6r_mast_d",name:"Master Kit No Steels/Pistons Diesel",part:"126004BD",supplier:"KING",category:"overhaul",price:null},{id:"6r_mast_g",name:"Master Kit No Steels/Pistons Gas",part:"126004BG",supplier:"KING",category:"overhaul",price:null},{id:"6r_banner",name:"HD Banner Kit",part:"-",supplier:"-",category:"overhaul",price:null},{id:"6r_vb",name:"Valve Body",part:"HC3Z7A100B",supplier:"Cam Clarke",category:"electrical",price:null},{id:"6r_bushing",name:"Bushing Kit",part:"236030",supplier:"KING",category:"overhaul",price:null},{id:"6r_pump_bear",name:"Pump Bearing",part:"S126209",supplier:"KING",category:"pump",price:null},{id:"6r_inp_drum",name:"Input Drum/Shaft",part:"BC3Z-7F207-C",supplier:"Cam Clarke",category:"hardparts",price:null},{id:"6r_converter",name:"Converter",part:"FM46",supplier:"PARTS4",category:"hardparts",price:null},{id:"6r_cent_supp",name:"Center Support Kit (Ford)",part:"-",supplier:"-",category:"hardparts",price:null},{id:"6r_pump",name:"Pump Without PTO",part:"D126500",supplier:"KING",category:"pump",price:null},{id:"6r_dir_pis",name:"Direct Piston Aluminum (Ford)",part:"BC3Z7A262B",supplier:"Cam Clarke",category:"friction",price:null},{id:"6r_misc_pp",name:"Misc Pressure Plates",part:"-",supplier:"-",category:"friction",price:null},{id:"6r_steel_d",name:"Steel Module Diesel",part:"126139B",supplier:"KING",category:"friction",price:null},{id:"6r_steel_g",name:"Steel Module Gas",part:"126139A",supplier:"KING",category:"friction",price:null},{id:"6r_snap",name:"Snap Rings",part:"-",supplier:"-",category:"hardparts",price:null},{id:"6r_filter",name:"Filter",part:"A126010",supplier:"KING",category:"filter",price:null},{id:"6r_od_piston",name:"Overdrive Piston (Moulded)",part:"126960",supplier:"KING",category:"friction",price:null},{id:"6r_harness",name:"Harness",part:"-",supplier:"-",category:"electrical",price:null},{id:"6r_od_steels",name:"Overdrive Steels",part:"126120",supplier:"KING",category:"friction",price:null},{id:"6r_oil_seal",name:"Oil Filter Housing Seal to Block",part:"BC3Z6840A",supplier:"Cam Clarke",category:"overhaul",price:null}]},"6F35":{label:"6F35",make:"Ford",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Electrical",color:"#4fc3f7"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"6f_seal",name:"Seal Kit (Ford w/ Pistons)",part:"MTK132959",supplier:"CC Ford",category:"overhaul",price:null},{id:"6f_friction",name:"Friction Module",part:"J144119A",supplier:"KING",category:"friction",price:null},{id:"6f_steel",name:"Steel Module",part:"144139A",supplier:"KING",category:"friction",price:null},{id:"6f_vb",name:"Valve Body",part:"CV6Z-7A100-B",supplier:"CC Ford",category:"electrical",price:null},{id:"6f_sol_block",name:"Solenoid Block",part:"CV6Z-7G391-A",supplier:"CC Ford",category:"electrical",price:null},{id:"6f_diff_shim",name:"Differential/Shim Kit",part:"S144761-5K",supplier:"KING",category:"overhaul",price:null},{id:"6f_converter",name:"Torque Converter",part:"A-FM112",supplier:"PARTS",category:"hardparts",price:null},{id:"6f_chain",name:"Chain",part:"9L8Z-7G249-C",supplier:"CC Ford",category:"hardparts",price:null},{id:"6f_drum456",name:"4-5-6 Drum",part:"D144550B",supplier:"KING",category:"hardparts",price:null},{id:"6f_bushing",name:"Bushing Kit",part:"144030X",supplier:"KING",category:"overhaul",price:null},{id:"6f_axle_e",name:"K099 Axle Bushing Kit (Early)",part:"144064CT",supplier:"KING",category:"overhaul",price:null},{id:"6f_axle_l",name:"K0199 Axle Bushing Kit (Late)",part:"144064T",supplier:"KING",category:"overhaul",price:null},{id:"6f_bville_lr",name:"Low Reverse Belleville Spring",part:"D144977BA",supplier:"KING",category:"hardparts",price:null},{id:"6f_bville_fw",name:"Forward Belleville Spring",part:"D144974BA",supplier:"KING",category:"hardparts",price:null},{id:"6f_low_diode",name:"Low Diode",part:"D144644B",supplier:"KING",category:"hardparts",price:null}]},"4L80E":{label:"4L80E",make:"GM",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Electrical",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"4l80_banner",name:"Banner Kit",part:"34004EAF",supplier:"KING",category:"overhaul",price:null},{id:"4l80_surecure",name:"Sure Cure Kit",part:"S34174",supplier:"KING",category:"overhaul",price:null},{id:"4l80_bushing",name:"Bushing Kit",part:"34030EA",supplier:"KING",category:"overhaul",price:null},{id:"4l80_int_sprag",name:"Intermediate Sprag HD",part:"A34652A",supplier:"KING",category:"hardparts",price:null},{id:"4l80_snap",name:"Snap Ring 22878C",part:"22878C",supplier:"KING",category:"hardparts",price:null},{id:"4l80_lr_band",name:"Low Reverse Band",part:"B34024E",supplier:"KING",category:"friction",price:null},{id:"4l80_dir_drum",name:"Direct Drum",part:"B34022E",supplier:"KING",category:"hardparts",price:null},{id:"4l80_piston",name:"Piston Kit",part:"T34960AK",supplier:"KING",category:"overhaul",price:null},{id:"4l80_converter",name:"Torque Converter",part:"BU54",supplier:"PARTS",category:"hardparts",price:null},{id:"4l80_steel",name:"Steel Module",part:"T34139EA",supplier:"KING",category:"friction",price:null},{id:"4l80_od_e",name:"Overdrive Drum Kit (Early)",part:"A34551A",supplier:"KING",category:"hardparts",price:null},{id:"4l80_od_l",name:"Overdrive Drum Kit (Late)",part:"A34551",supplier:"KING",category:"hardparts",price:null},{id:"4l80_fwd_drum",name:"Forward Drum",part:"A34554EA",supplier:"KING",category:"hardparts",price:null},{id:"4l80_torr_brg",name:"Torrington Bearing Kit",part:"34201A",supplier:"KING",category:"overhaul",price:null},{id:"4l80_washer",name:"Washer Kit",part:"34200E",supplier:"KING",category:"overhaul",price:null},{id:"4l80_pump_grs",name:"Pump Gears",part:"A34530A",supplier:"KING",category:"pump",price:null},{id:"4l80_pump",name:"Pump",part:"A34510EA",supplier:"KING",category:"pump",price:null},{id:"4l80_filter",name:"Filter",part:"34010EA",supplier:"KING",category:"filter",price:null},{id:"4l80_pcs_e",name:"Pressure Control Solenoid (Early)",part:"34435A",supplier:"KING",category:"electrical",price:null},{id:"4l80_pcs_l",name:"Pressure Control Solenoid (Late)",part:"34435C",supplier:"KING",category:"electrical",price:null},{id:"4l80_pwm_lu",name:"Lockup PWM Solenoid",part:"34418",supplier:"KING",category:"electrical",price:null},{id:"4l80_shift_sol",name:"2-Shift Solenoid",part:"34421",supplier:"KING",category:"electrical",price:null},{id:"4l80_psm",name:"Pressure Switch Manifold",part:"A34442",supplier:"KING",category:"electrical",price:null},{id:"4l80_misc_pp",name:"Pressure Plate (Misc)",part:"D34144B",supplier:"KING",category:"friction",price:null},{id:"4l80_plan_f",name:"Planetary (Front)",part:"U34584AB",supplier:"KING",category:"hardparts",price:null},{id:"4l80_plan_r",name:"Planetary (Rear)",part:"U34584EA",supplier:"KING",category:"hardparts",price:null}]},"48RE":{label:"48RE",make:"Dodge/Ram",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Bands",color:"#f0c040"},electrical:{label:"Electrical",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"48_banner",name:"Banner Kit",part:"22002HW",supplier:"KING",category:"overhaul",price:null},{id:"48_surecure",name:"Sure Cure Kit",part:"S22174A",supplier:"KING",category:"overhaul",price:null},{id:"48_bushing",name:"Bushing Kit",part:"22030EC",supplier:"KING",category:"overhaul",price:null},{id:"48_front_band",name:"Front Band",part:"B22022A",supplier:"KING",category:"friction",price:null},{id:"48_rear_band",name:"Rear Band (Double Wrap)",part:"N22024C",supplier:"KING",category:"friction",price:null},{id:"48_servo_pin",name:"Rear Servo Pin Kit",part:"A12913",supplier:"KING",category:"hardparts",price:null},{id:"48_od_shim",name:"Overdrive Shim Kit",part:"S12213K",supplier:"KING",category:"overhaul",price:null},{id:"48_lb_drum",name:"Low Band Drum",part:"A225554G",supplier:"KING",category:"hardparts",price:null},{id:"48_od_pis_sup",name:"Overdrive Piston Support",part:"A22634B",supplier:"KING",category:"hardparts",price:null},{id:"48_dir_drum",name:"Direct Drum",part:"U22555B",supplier:"KING",category:"hardparts",price:null},{id:"48_od_planet",name:"Overdrive Planetary",part:"A12580BB",supplier:"KING",category:"hardparts",price:null},{id:"48_od_sun",name:"Overdrive Sun Gear",part:"A12610AB",supplier:"KING",category:"hardparts",price:null},{id:"48_od_brg",name:"Overdrive Bearing Kit",part:"22201A",supplier:"KING",category:"overhaul",price:null},{id:"48_filter",name:"Filter",part:"A12010J",supplier:"KING",category:"filter",price:null},{id:"48_gov_sol",name:"Governor Solenoid",part:"12432A",supplier:"KING",category:"electrical",price:null},{id:"48_transducer",name:"Transducer",part:"T12432A",supplier:"KING",category:"electrical",price:null},{id:"48_converter",name:"Torque Converter",part:"C50HD",supplier:"PARTS",category:"hardparts",price:null},{id:"48_lu_od_sol",name:"Lockup/Overdrive Solenoid",part:"12420C",supplier:"KING",category:"electrical",price:null},{id:"48_inp_sun",name:"Input Sun Gear",part:"A22612B",supplier:"KING",category:"hardparts",price:null},{id:"48_sunshell",name:"Sunshell",part:"-",supplier:"-",category:"hardparts",price:null},{id:"48_pump",name:"Pump",part:"R22500G",supplier:"KING",category:"pump",price:null},{id:"48_low_roll",name:"Low Roller",part:"22654A",supplier:"KING",category:"hardparts",price:null}]},"66RFE":{label:"66RFE",make:"Dodge/Ram",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},electrical:{label:"Electrical",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"66_banner",name:"Banner Kit",part:"D72006D",supplier:"KING",category:"overhaul",price:null},{id:"66_surecure",name:"Surecure Kit",part:"S72420ARK",supplier:"KING",category:"overhaul",price:null},{id:"66_tcc",name:"TCC Switch Valve",part:"44912-08K",supplier:"KING",category:"electrical",price:null},{id:"66_bushing",name:"Bushing Kit",part:"72030",supplier:"KING",category:"overhaul",price:null},{id:"66_converter",name:"Torque Converter",part:"C53M",supplier:"PARTS",category:"hardparts",price:null},{id:"66_piston",name:"Piston Kit",part:"72960CK",supplier:"KING",category:"overhaul",price:null},{id:"66_pan_flt",name:"Pan Filter",part:"A72010BA",supplier:"KING",category:"filter",price:null},{id:"66_spin_flt",name:"Spin On Filter",part:"72013A",supplier:"KING",category:"filter",price:null},{id:"66_transducer",name:"Transducer",part:"D72415",supplier:"KING",category:"electrical",price:null},{id:"66_sol_body",name:"Solenoid Body",part:"D72420A",supplier:"KING",category:"electrical",price:null},{id:"66_pump_bg",name:"Pump Body and Gears",part:"R72500A",supplier:"KING",category:"pump",price:null},{id:"66_steel",name:"Steel Module",part:"72139",supplier:"KING",category:"overhaul",price:null},{id:"66_od_rev",name:"OD-REV Pressure Plate Machined",part:"D72140A",supplier:"KING",category:"overhaul",price:30},{id:"66_low_sprag",name:"Low Sprag",part:"A72654",supplier:"KING",category:"hardparts",price:null},{id:"66_od_snap",name:"OD Snap Ring (Tapered)",part:"D72860",supplier:"KING",category:"hardparts",price:null}]},"62TE":{label:"62TE",make:"Dodge/Chrysler",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},electrical:{label:"Electrical",color:"#4fc3f7"},hardparts:{label:"Hard Parts",color:"#ff8a65"},valvebody:{label:"Valve Body",color:"#ce93d8"}},parts:[{id:"62_master",name:"Master Kit Mopar",part:"D132004",supplier:"-",category:"overhaul",price:null},{id:"62_os_prv",name:"OS Pressure Regulator Valve",part:"92835-29",supplier:"-",category:"valvebody",price:null},{id:"62_tcc_kit",name:"TCC Control/Plunger Kit",part:"92835-03K",supplier:"-",category:"valvebody",price:null},{id:"62_dir_drum",name:"Direct Drum",part:"A132555",supplier:"-",category:"hardparts",price:null},{id:"62_bushing",name:"Bushing Kit",part:"DB132030",supplier:"-",category:"overhaul",price:null},{id:"62_sol_body",name:"Solenoid Body",part:"D132420",supplier:"-",category:"electrical",price:null},{id:"62_lu_sol",name:"Lockup Solenoid",part:"D132425",supplier:"-",category:"electrical",price:null},{id:"62_transducer",name:"Transducer",part:"D132435",supplier:"-",category:"electrical",price:null},{id:"62_converter",name:"Torque Converter",part:"OM26",supplier:"PARTS4",category:"hardparts",price:null},{id:"62_sprag",name:"Sprag",part:"A132642",supplier:"-",category:"hardparts",price:null}]},"545_65RFE":{label:"545/65RFE",make:"Dodge/Chrysler",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},electrical:{label:"Electrical",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"545_banner",name:"Banner Kit",part:"72004",supplier:"KING",category:"overhaul",price:null},{id:"545_surecure",name:"Surecure Kit",part:"S72420ARK",supplier:"KING",category:"overhaul",price:null},{id:"545_tcc",name:"OS TCC Switch Valve",part:"44912-08K",supplier:"KING",category:"electrical",price:null},{id:"545_bushing",name:"Bushing Kit",part:"72030",supplier:"KING",category:"overhaul",price:null},{id:"545_converter",name:"Torque Converter",part:"C27LS",supplier:"PARTS",category:"hardparts",price:null},{id:"545_piston",name:"Piston Kit",part:"72960BK",supplier:"KING",category:"overhaul",price:null},{id:"545_pan_flt",name:"Pan Filter",part:"A72010BA",supplier:"KING",category:"filter",price:null},{id:"545_spin_flt",name:"Spin On Filter",part:"72013A",supplier:"KING",category:"filter",price:null},{id:"545_transducer",name:"Transducer",part:"D72415",supplier:"KING",category:"electrical",price:null},{id:"545_sol_body",name:"Solenoid Body",part:"D72420A",supplier:"KING",category:"electrical",price:null},{id:"545_pump_bg",name:"Pump Body and Gears",part:"R72500A",supplier:"KING",category:"pump",price:null},{id:"545_steel",name:"Steel Module",part:"72139",supplier:"KING",category:"overhaul",price:null},{id:"545_od_rev",name:"OD-REV Pressure Plate Machined",part:"D72140A",supplier:"KING",category:"overhaul",price:30},{id:"545_od_snap",name:"OD Snap Ring (Tapered)",part:"D72860",supplier:"KING",category:"hardparts",price:null}]},"4L60E":{label:"4L60E",make:"GM",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Electrical",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"4l60_banner",name:"Banner Kit",part:"74008EDF",supplier:"KING",category:"overhaul",price:null},{id:"4l60_surecure",name:"Sure Cure Kit",part:"S741774A",supplier:"KING",category:"overhaul",price:null},{id:"4l60_24_band",name:"2-4 Band",part:"B74020AH",supplier:"KING",category:"friction",price:null},{id:"4l60_rear_plan",name:"Rear Planetary Kit",part:"U74584BK",supplier:"KING",category:"hardparts",price:null},{id:"4l60_rear_sun",name:"Rear Sun Gear",part:"A74614",supplier:"KING",category:"hardparts",price:null},{id:"4l60_sun_shell",name:"Sun Shell",part:"S74624SS",supplier:"KING",category:"hardparts",price:null},{id:"4l60_pcs_e",name:"Pressure Control Solenoid",part:"34435A",supplier:"KING",category:"electrical",price:null},{id:"4l60_pwm_lu",name:"PWM LU Solenoid",part:"74418E",supplier:"KING",category:"electrical",price:null},{id:"4l60_shift_sol",name:"2-Shift Solenoid",part:"34421",supplier:"KING",category:"electrical",price:null},{id:"4l60_filter",name:"Filter",part:"A74010ECP",supplier:"KING",category:"filter",price:null},{id:"4l60_converter",name:"Torque Converter",part:"BU54",supplier:"PARTS",category:"hardparts",price:null},{id:"4l60_bushing",name:"Bushing Kit",part:"74030E",supplier:"KING",category:"overhaul",price:null},{id:"4l60_sprag",name:"Sprag",part:"A74658B",supplier:"KING",category:"hardparts",price:null},{id:"4l60_low_roll",name:"Low Roller",part:"74654A",supplier:"KING",category:"hardparts",price:null},{id:"4l60_rev_drum",name:"Reverse Input Drum",part:"A74556B",supplier:"KING",category:"hardparts",price:null},{id:"4l60_psm",name:"Pressure Switch Manifold",part:"74442",supplier:"KING",category:"electrical",price:null},{id:"4l60_steel",name:"Steel Module",part:"74139B",supplier:"KING",category:"friction",price:null},{id:"4l60_hd_34",name:"HD 3-4 Clutch Kit",part:"R74119EHP",supplier:"KING",category:"friction",price:null}]},CVT:{label:"CVT",make:"Various",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},electrical:{label:"Valve Body",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},filter:{label:"Filter",color:"#80cbc4"},hardparts:{label:"Hard Parts",color:"#ff8a65"}},parts:[{id:"cvt_seal",name:"Seal Kit",part:"",supplier:"",category:"overhaul",price:null},{id:"cvt_friction",name:"Friction Module",part:"",supplier:"",category:"overhaul",price:null},{id:"cvt_steel",name:"Steel Module",part:"",supplier:"",category:"overhaul",price:null},{id:"cvt_flow",name:"Flow Valve",part:"",supplier:"",category:"electrical",price:null},{id:"cvt_sump_flt",name:"Sump Filter",part:"",supplier:"",category:"filter",price:null},{id:"cvt_cart_flt",name:"Cartridge Filter",part:"",supplier:"",category:"filter",price:null},{id:"cvt_rear_cov",name:"Rear Cover & Pulley Kit",part:"",supplier:"",category:"hardparts",price:null},{id:"cvt_vb",name:"Valve Body",part:"",supplier:"",category:"electrical",price:null},{id:"cvt_pump",name:"Pump",part:"",supplier:"",category:"pump",price:null},{id:"cvt_bushing",name:"Bushing Kit",part:"",supplier:"",category:"overhaul",price:null}]},"8L90":{label:"8L90",make:"GM",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Clutch",color:"#f0c040"},electrical:{label:"Electrical",color:"#4fc3f7"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter",color:"#80cbc4"}},parts:[{id:"8l90_banner",name:"Banner Kit",part:"54002",supplier:"KING",category:"overhaul",price:null},{id:"8l90_friction",name:"Friction Module",part:"154119",supplier:"KING",category:"friction",price:null},{id:"8l90_bushing",name:"Bushing Kit",part:"154030",supplier:"KING",category:"overhaul",price:null},{id:"8l90_harness",name:"Wire Harness 8145/90",part:"D154446F",supplier:"KING",category:"electrical",price:null},{id:"8l90_filter",name:"Filter",part:"A154010",supplier:"KING",category:"filter",price:null},{id:"8l90_drum",name:"Drum 8190 2-8 & 4-8 RE",part:"D154555",supplier:"KING",category:"hardparts",price:null},{id:"8l90_tcc_zip",name:"TCC Zip Kit",part:"S154741ZTK",supplier:"KING",category:"electrical",price:null},{id:"8l90_steels",name:"12345R Steels",part:"154134",supplier:"KING",category:"friction",price:null},{id:"8l90_shift_kit",name:"Shift Kit / Polish Valves",part:"-",supplier:"-",category:"electrical",price:null},{id:"8l90_converter",name:"Torque Converter",part:"GM4",supplier:"PARTS",category:"hardparts",price:null}]}};

const ADDITIONAL_SERVICES = {
  TRANSFER_CASE:{label:"Transfer Case",make:"Various",icon:"TC",categories:{seals:{label:"Bearing & Seal Kit",color:"#f0c040"},chain:{label:"Chain & Sprockets",color:"#ff6b35"},hardparts:{label:"Hard Parts",color:"#ff8a65"},other:{label:"Other",color:"#80cbc4"}},parts:[{id:"tc_seal_kit",name:"Bearing & Seal Kit (Complete)",part:"-",supplier:"-",category:"seals",price:null},{id:"tc_front_seal",name:"Front Input Seal",part:"-",supplier:"-",category:"seals",price:null},{id:"tc_rear_seal",name:"Rear Output Seal",part:"-",supplier:"-",category:"seals",price:null},{id:"tc_chain",name:"Transfer Case Chain",part:"-",supplier:"-",category:"chain",price:null},{id:"tc_drive_spkt",name:"Drive Sprocket",part:"-",supplier:"-",category:"chain",price:null},{id:"tc_driven_spkt",name:"Driven Sprocket",part:"-",supplier:"-",category:"chain",price:null},{id:"tc_encoder_mtr",name:"Encoder Motor",part:"-",supplier:"-",category:"other",price:null},{id:"tc_actuator",name:"Shift Actuator",part:"-",supplier:"-",category:"other",price:null},{id:"tc_speed_sens",name:"Speed Sensor",part:"-",supplier:"-",category:"other",price:null}]},
  DIFFERENTIAL:{label:"Differential",make:"Various",icon:"🔧",categories:{seals:{label:"Bearing & Seal Kit",color:"#f0c040"},gears:{label:"Crown & Pinion",color:"#ff6b35"},carrier:{label:"Carrier Assembly",color:"#ce93d8"},axle:{label:"Axle & Bearings",color:"#4fc3f7"},spider:{label:"Spider Gears",color:"#81c784"}},parts:[{id:"df_brg_seal",name:"Master Bearing & Seal Kit",part:"-",supplier:"-",category:"seals",price:null},{id:"df_pinion_seal",name:"Pinion Seal",part:"-",supplier:"-",category:"seals",price:null},{id:"df_ring_pinion",name:"Ring & Pinion Set",part:"-",supplier:"-",category:"gears",price:null},{id:"df_carrier",name:"Carrier Assembly",part:"-",supplier:"-",category:"carrier",price:null},{id:"df_lsd",name:"Limited Slip Unit",part:"-",supplier:"-",category:"carrier",price:null},{id:"df_axle_l",name:"Axle Shaft (Left)",part:"-",supplier:"-",category:"axle",price:null},{id:"df_axle_r",name:"Axle Shaft (Right)",part:"-",supplier:"-",category:"axle",price:null},{id:"df_spider_kit",name:"Spider Gear Kit (Complete)",part:"-",supplier:"-",category:"spider",price:null}]},
  GENERIC_AUTO:{label:"Generic Auto Trans",make:"Various",icon:"🔩",categories:{overhaul:{label:"Overhaul / Kits",color:"#ff6b35"},friction:{label:"Friction & Steels",color:"#f0c040"},electrical:{label:"Electrical / Solenoids",color:"#4fc3f7"},pump:{label:"Pump Assembly",color:"#81c784"},hardparts:{label:"Hard Parts",color:"#ff8a65"},filter:{label:"Filter & Pan",color:"#80cbc4"}},parts:[{id:"ga_master_kit",name:"Master Rebuild Kit",part:"-",supplier:"-",category:"overhaul",price:null},{id:"ga_friction_mod",name:"Friction Module",part:"-",supplier:"-",category:"friction",price:null},{id:"ga_steel_mod",name:"Steel Module",part:"-",supplier:"-",category:"friction",price:null},{id:"ga_sol_kit",name:"Solenoid Kit (Full Set)",part:"-",supplier:"-",category:"electrical",price:null},{id:"ga_pump_assy",name:"Pump Assembly (Complete)",part:"-",supplier:"-",category:"pump",price:null},{id:"ga_tc",name:"Torque Converter",part:"-",supplier:"-",category:"hardparts",price:null},{id:"ga_filter",name:"Filter",part:"-",supplier:"-",category:"filter",price:null}]},
  MANUAL_TRANS:{label:"Manual Transmission",make:"Various",icon:"MT",categories:{overhaul:{label:"Overhaul / Seals",color:"#ff6b35"},gears:{label:"Gear Sets",color:"#f0c040"},syncro:{label:"Synchros & Rings",color:"#4fc3f7"},clutch:{label:"Clutch System",color:"#81c784"}},parts:[{id:"mt_master_kit",name:"Master Rebuild Kit",part:"-",supplier:"-",category:"overhaul",price:null},{id:"mt_bearing_kit",name:"Bearing Kit (Full Set)",part:"-",supplier:"-",category:"overhaul",price:null},{id:"mt_syncro_kit",name:"Synchro Kit (Full Set)",part:"-",supplier:"-",category:"syncro",price:null},{id:"mt_clutch_kit",name:"Clutch Kit (Disc, Pressure, Bearing)",part:"-",supplier:"-",category:"clutch",price:null},{id:"mt_flywheel",name:"Flywheel / Flexplate",part:"-",supplier:"-",category:"clutch",price:null}]}
};

const ALL_TRANS = { ...TRANS_DATA, ...ADDITIONAL_SERVICES };

const TRANS_GROUPS = [
  { label: "Automatic Transmissions", color: "#ff6b35", keys: Object.keys(TRANS_DATA) },
  { label: "Transfer Case", color: "#f0c040", keys: ["TRANSFER_CASE"] },
  { label: "Differential", color: "#4fc3f7", keys: ["DIFFERENTIAL"] },
  { label: "Generic Auto Trans", color: "#81c784", keys: ["GENERIC_AUTO"] },
  { label: "Manual Transmission", color: "#ce93d8", keys: ["MANUAL_TRANS"] }
];

const MAKE_COLORS = { "Dodge/Ram": "#e8303a", Ford: "#0066cc", GM: "#f9a825", "Dodge/Chrysler": "#9c27b0", Various: "#607d8b" };

const CHECKLIST = [
  {id:"ds_front",label:"Front Driveshaft",category:"driveline",photo:false},
  {id:"ds_rear",label:"Rear Driveshaft",category:"driveline",photo:false},
  {id:"tc_unit",label:"Transfer Case",category:"driveline",photo:false},
  {id:"yoke_uj",label:"Yokes / U-Joints",category:"driveline",photo:true},
  {id:"tail_seal",label:"Tail Housing Seal",category:"seals",photo:true},
  {id:"pump_seal",label:"Front Pump Seal",category:"seals",photo:true},
  {id:"out_seal",label:"Output Shaft Seal",category:"seals",photo:true},
  {id:"ext_seal",label:"Extension Housing Seal",category:"seals",photo:true},
  {id:"tc_seal_f",label:"Transfer Case Front Seal",category:"seals",photo:true},
  {id:"tc_seal_r",label:"Transfer Case Rear Seal",category:"seals",photo:true},
  {id:"trans_fluid",label:"Trans Fluid Condition",category:"fluids",photo:true},
  {id:"tc_fluid",label:"Transfer Case Fluid",category:"fluids",photo:true},
  {id:"diff_front",label:"Front Differential Fluid",category:"fluids",photo:false},
  {id:"diff_rear",label:"Rear Differential Fluid",category:"fluids",photo:false},
  {id:"cool_contam",label:"Cooler Line Contamination",category:"fluids",photo:true},
  {id:"cool_lines",label:"Cooler Lines Condition",category:"cooling",photo:true},
  {id:"cooler_unit",label:"Transmission Cooler",category:"cooling",photo:true},
  {id:"cool_fitt",label:"Cooler Fittings / Ferrules",category:"cooling",photo:true},
  {id:"aux_cooler",label:"Auxiliary Cooler",category:"cooling",photo:false},
  {id:"crossmember",label:"Crossmember / Mount",category:"recommend",photo:true},
  {id:"wiring",label:"Wiring Harness Condition",category:"recommend",photo:true},
  {id:"flex_plate",label:"Flex Plate Inspection",category:"recommend",photo:true},
  {id:"throttle",label:"Throttle Body / Linkage",category:"recommend",photo:false},
  {id:"skid_plate",label:"Skid Plate Condition",category:"recommend",photo:false},
  {id:"exhaust_cl",label:"Exhaust Clearance",category:"recommend",photo:false}
];

const CHECKLIST_CATS = {
  driveline: { label: "Driveline", color: "#ff6b35" },
  seals: { label: "Seals", color: "#f0c040" },
  fluids: { label: "Fluids", color: "#4fc3f7" },
  cooling: { label: "Cooling System", color: "#81c784" },
  recommend: { label: "Recommendations", color: "#ce93d8" }
};

const STATUSES = ["Pass", "Fail", "Needs Attention"];
const STATUS_COLORS = { Pass: "#4caf50", Fail: "#f44336", "Needs Attention": "#ff9800" };
const mkCustomRow = () => ({ name: "", part: "", supplier: "", price: "" });

// ── CSS ───────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@600;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#c0ccd8;border-radius:2px;}
body{background:#e8edf2;font-family:'Share Tech Mono','Courier New',monospace;}

.hdr{background:#1a2230;border-bottom:3px solid #ff6b35;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:300;box-shadow:0 2px 12px rgba(0,0,0,.3);}
.logo{font-family:'Orbitron',sans-serif;font-size:18px;letter-spacing:4px;color:#fff;}
.logo span{color:#ff6b35;}
.live-badge{font-size:9px;letter-spacing:2px;background:#22aa55;color:#fff;padding:2px 8px;border-radius:3px;font-weight:700;text-transform:uppercase;}
.nav{display:flex;gap:3px;}
.nb{padding:7px 14px;border:1px solid #3a4a5a;background:transparent;color:#8899aa;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:4px;transition:all .15s;}
.nb.on{background:#ff6b35;color:#fff;border-color:#ff6b35;font-weight:600;}
.nb:hover:not(.on){color:#fff;border-color:#5a6a7a;}
.nb:disabled{opacity:.35;cursor:not-allowed;}

.pg{padding:18px;max-width:920px;margin:0 auto;}
.section-title{font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:4px;color:#ff6b35;text-transform:uppercase;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #d0d8e0;}

.ro-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.fld{display:flex;flex-direction:column;gap:5px;}
.flbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4a5a6a;font-weight:600;}
.finput{background:#fff;border:2px solid #c0ccd8;border-radius:4px;padding:10px 13px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:13px;outline:none;transition:border-color .15s;box-shadow:0 1px 3px rgba(0,0,0,.08);}
.finput:focus{border-color:#ff6b35;}
.finput::placeholder{color:#aabbcc;}

.trans-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-bottom:24px;}
.trans-card{background:#fff;border:2px solid #d0d8e0;border-radius:6px;padding:13px;cursor:pointer;transition:all .15s;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.08);}
.trans-card:hover{border-color:#aabbcc;}
.trans-card.sel{border-color:var(--mc);background:#fff8f5;box-shadow:0 2px 8px rgba(255,107,53,.15);}
.trans-label{font-family:'Orbitron',sans-serif;font-size:12px;letter-spacing:2px;color:#1a2230;margin-bottom:5px;}
.trans-make{font-size:9px;letter-spacing:1px;color:var(--mc);text-transform:uppercase;font-weight:600;}

.go-btn{width:100%;padding:15px;background:#ff6b35;color:#fff;border:none;border-radius:5px;font-family:'Orbitron',sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all .15s;font-weight:800;box-shadow:0 3px 10px rgba(255,107,53,.3);}
.go-btn:hover{background:#e85c28;}
.go-btn:disabled{background:#c0ccd8;color:#8899aa;cursor:not-allowed;box-shadow:none;}

.saved-ros{background:#fff;border:2px solid #d0d8e0;border-radius:6px;padding:14px;margin-bottom:20px;box-shadow:0 1px 4px rgba(0,0,0,.07);}
.saved-ros-title{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#ff6b35;font-weight:700;margin-bottom:10px;}
.ro-row{display:flex;align-items:center;gap:10px;padding:9px 12px;background:#f5f8fb;border-radius:4px;margin-bottom:5px;cursor:pointer;transition:all .15s;border:2px solid transparent;}
.ro-row:hover{border-color:#ff6b35;background:#fff8f5;}
.ro-row-num{font-family:'Orbitron',sans-serif;font-size:11px;color:#ff6b35;min-width:80px;font-weight:700;}
.ro-row-veh{font-size:11px;color:#1a2230;flex:1;}
.ro-row-stage{font-size:9px;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;border-radius:3px;font-weight:700;}
.ro-row-time{font-size:9px;color:#7a8a9a;}

.rem-cat{margin-bottom:22px;}
.cat-bar{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
.cat-pip{width:8px;height:8px;border-radius:2px;flex-shrink:0;}
.cat-name{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#1a2230;font-weight:600;}
.cat-ct{margin-left:auto;font-size:10px;color:#7a8a9a;font-weight:600;}
.rem-item{background:#fff;border:2px solid #d0d8e0;border-radius:6px;padding:13px;margin-bottom:7px;box-shadow:0 1px 3px rgba(0,0,0,.06);}
.rem-item-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.rem-item-label{flex:1;font-size:13px;color:#1a2230;min-width:140px;font-weight:500;}
.status-btns{display:flex;gap:5px;}
.sbtn{padding:5px 11px;border-radius:4px;border:2px solid #d0d8e0;background:#f5f8fb;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s;color:#4a5a6a;font-weight:600;}
.sbtn:hover{border-color:#aabbcc;color:#1a2230;}
.sbtn.on{color:#fff;font-weight:700;border-color:transparent;}
.rem-bottom{display:flex;gap:8px;margin-top:9px;flex-wrap:wrap;}
.note-in{flex:1;background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;padding:6px 10px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:11px;outline:none;min-width:180px;}
.note-in:focus{border-color:#ff6b35;}
.photo-btn{padding:6px 12px;background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;color:#4a5a6a;font-size:10px;cursor:pointer;white-space:nowrap;transition:all .15s;font-weight:600;}
.photo-btn.has{border-color:#0099cc;color:#0099cc;}

.push-findings-btn{margin-top:14px;padding:10px 20px;background:#ce93d8;color:#fff;border:none;border-radius:5px;font-family:'Orbitron',sans-serif;font-size:9px;letter-spacing:3px;cursor:pointer;font-weight:700;}
.push-findings-btn:disabled{background:#c0ccd8;cursor:not-allowed;}
.push-findings-btn.done{background:#22aa55;}

.custom-section{margin-top:20px;padding-top:16px;border-top:2px solid #d0d8e0;}
.custom-title{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#ff6b35;margin-bottom:10px;font-weight:700;}
.custom-row{display:grid;grid-template-columns:2fr 1.5fr 1fr 80px;gap:6px;margin-bottom:6px;align-items:center;}
.ci{background:#fff;border:2px solid #d0d8e0;border-radius:4px;padding:8px 10px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:11px;outline:none;}
.ci:focus{border-color:#ff6b35;}

.sign-bar{background:#1a2230;border-radius:6px;padding:16px;margin-top:20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
.sign-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8899aa;flex-shrink:0;font-weight:600;}
.init-in{background:#0d1520;border:2px solid #3a4a5a;border-radius:4px;padding:9px 13px;color:#ff6b35;font-family:'Orbitron',monospace;font-size:15px;letter-spacing:4px;width:95px;outline:none;text-transform:uppercase;}
.init-in:focus{border-color:#ff6b35;}
.sign-btn{padding:11px 22px;background:#ff6b35;color:#fff;border:none;border-radius:4px;font-family:'Orbitron',sans-serif;font-size:10px;letter-spacing:3px;cursor:pointer;flex-shrink:0;transition:all .15s;font-weight:700;}
.sign-btn:hover{background:#e85c28;}
.sign-btn:disabled{background:#3a4a5a;color:#5a6a7a;cursor:not-allowed;}
.sign-btn.done{background:#22aa55;}

.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px;}
.stat-box{background:#fff;border:2px solid #d0d8e0;border-radius:5px;padding:12px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.07);}
.stat-val{font-family:'Orbitron',sans-serif;font-size:24px;letter-spacing:2px;}
.stat-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#7a8a9a;margin-top:3px;font-weight:600;}

.filter-bar{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:16px;}
.fcb{padding:5px 12px;border-radius:4px;border:2px solid #d0d8e0;background:#fff;color:#4a5a6a;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s;font-weight:600;}
.fcb.on{border-color:var(--c);color:var(--c);}

.cat-block{margin-bottom:22px;}
.parts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;}
.pc{background:#fff;border:2px solid #d0d8e0;border-radius:6px;padding:13px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.07);}
.pc:hover{border-color:#aabbcc;}
.pc.sel{border-color:var(--c);box-shadow:0 2px 8px rgba(0,0,0,.1);}
.pc.sel::after{content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:var(--c);}
.chk{position:absolute;top:9px;right:9px;width:18px;height:18px;border-radius:3px;background:var(--c);display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:bold;}
.pc-name{font-size:12px;font-weight:700;color:#1a2230;margin-bottom:4px;line-height:1.3;}
.pc-num{font-size:9px;color:#7a8a9a;margin-bottom:5px;font-family:'Share Tech Mono',monospace;}
.pc-sup{display:inline-block;font-size:8px;letter-spacing:1px;text-transform:uppercase;padding:2px 6px;border:1px solid #d0d8e0;border-radius:3px;color:#4a5a6a;background:#f5f8fb;font-weight:600;}
.pc-price-row{display:flex;align-items:center;margin-top:9px;}
.pi{background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;padding:5px 8px;color:#e85c28;font-family:'Share Tech Mono',monospace;font-size:12px;width:85px;outline:none;font-weight:700;}
.pi:focus{border-color:#ff6b35;}
.pfixed{font-size:13px;color:#e85c28;font-weight:700;}
.pc-note{width:100%;margin-top:7px;background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;padding:5px 8px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:10px;resize:none;height:38px;outline:none;}
.pc-note:focus{border-color:#ff6b35;}

.sticky-bot{position:sticky;bottom:0;background:#1a2230;border-top:3px solid #ff6b35;padding:12px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;z-index:200;box-shadow:0 -4px 16px rgba(0,0,0,.2);}
.sb-stat{display:flex;flex-direction:column;gap:2px;}
.sb-lbl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#6a7a8a;font-weight:600;}
.sb-val{font-family:'Orbitron',sans-serif;font-size:20px;letter-spacing:2px;}
.sb-val.og{color:#ff6b35;}.sb-val.gn{color:#22cc66;}
.act-btn{padding:9px 18px;border:none;border-radius:4px;font-family:'Orbitron',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .15s;flex-shrink:0;font-weight:700;}
.act-btn.primary{background:#ff6b35;color:#fff;}
.act-btn.primary:hover{background:#e85c28;}
.act-btn.primary:disabled{background:#3a4a5a;color:#5a6a7a;cursor:not-allowed;}

.adv-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:22px;}
.adv-stat{background:#fff;border:2px solid #d0d8e0;border-radius:5px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.07);}
.adv-stat-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#7a8a9a;margin-bottom:5px;font-weight:600;}
.adv-stat-val{font-family:'Orbitron',sans-serif;font-size:26px;letter-spacing:2px;}
.adv-item{background:#fff;border:2px solid #d0d8e0;border-radius:7px;margin-bottom:8px;overflow:hidden;transition:border-color .15s;box-shadow:0 1px 4px rgba(0,0,0,.07);}
.adv-item.open{border-color:#ff6b35;}
.adv-hdr{display:flex;align-items:center;gap:10px;padding:14px 16px;cursor:pointer;}
.adv-hdr:hover{background:#f9fbfc;}
.adv-info{flex:1;min-width:0;}
.adv-name{font-size:13px;font-weight:700;color:#1a2230;margin-bottom:3px;}
.adv-sub{font-size:9px;letter-spacing:1px;text-transform:uppercase;font-weight:600;}
.adv-num{font-size:9px;color:#aabbcc;margin-top:2px;font-family:'Share Tech Mono',monospace;}
.adv-price{font-family:'Orbitron',sans-serif;font-size:18px;letter-spacing:1px;color:#22aa55;flex-shrink:0;font-weight:700;}
.adv-arr{color:#c0ccd8;font-size:13px;transition:transform .2s;flex-shrink:0;}
.adv-item.open .adv-arr{transform:rotate(90deg);color:#ff6b35;}
.tp-wrap{padding:14px 16px;border-top:2px solid #eef2f6;background:#f9fbfc;}
.spin{width:13px;height:13px;border:2px solid #d0d8e0;border-top-color:#ff6b35;border-radius:50%;animation:sp .6s linear infinite;display:inline-block;}
@keyframes sp{to{transform:rotate(360deg);}}
.tp-pitch{background:#fff8f5;border:2px solid #ff6b35;border-radius:4px;padding:13px;margin-bottom:8px;}
.tp-pitch-lbl{font-size:8px;letter-spacing:2px;color:#ff6b35;margin-bottom:7px;font-weight:700;}
.tp-pitch-txt{font-size:12px;color:#1a2230;line-height:1.65;font-weight:500;}
.tp-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:7px;}
.tp-c{background:#fff;border:2px solid #d0d8e0;border-radius:4px;padding:11px;}
.tp-cl{font-size:8px;letter-spacing:2px;color:#7a8a9a;margin-bottom:6px;font-weight:700;text-transform:uppercase;}
.tp-ct{font-size:11px;color:#2a3a4a;line-height:1.6;}
.tp-pair{background:#f0fff5;border:2px solid #22aa55;border-radius:4px;padding:11px;}
.tp-pair .tp-cl{color:#22aa55;}

.flag-item{display:flex;align-items:center;gap:10px;padding:9px 13px;background:#fff;border-radius:5px;margin-bottom:5px;border-left:4px solid var(--fc);box-shadow:0 1px 3px rgba(0,0,0,.07);}
.flag-status{font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--fc);flex-shrink:0;width:110px;font-weight:700;}
.flag-name{font-size:12px;color:#1a2230;font-weight:500;}
.flag-note{font-size:10px;color:#7a8a9a;margin-left:auto;}
.total-row{display:flex;justify-content:flex-end;align-items:center;gap:14px;margin-top:18px;padding-top:14px;border-top:2px solid #d0d8e0;}
.empty{text-align:center;padding:50px 20px;}
.empty-ico{font-size:44px;margin-bottom:14px;}
.empty-txt{font-size:11px;letter-spacing:1px;line-height:2;color:#7a8a9a;}

@media(max-width:600px){
  .ro-grid{grid-template-columns:1fr;}
  .custom-row{grid-template-columns:1fr 1fr;}
  .parts-grid{grid-template-columns:1fr 1fr;}
  .adv-cards{grid-template-columns:1fr 1fr;}
  .tp-row{grid-template-columns:1fr;}
  .stats-row{grid-template-columns:1fr 1fr;}
}
`;

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function App() {
  // PIN state
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showAdminPin, setShowAdminPin] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  // Nav
  const [tab, setTab] = useState("ro");

  // Settings (persisted)
  const [relayUrl, setRelayUrl] = useState(() => localStorage.getItem("gf_relay_url") || "");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gf_api_key") || "");

  // Save settings to localStorage whenever they change
  useEffect(() => { localStorage.setItem("gf_relay_url", relayUrl); }, [relayUrl]);
  useEffect(() => { localStorage.setItem("gf_api_key", apiKey); }, [apiKey]);

  // RO info
  const [ro, setRo] = useState({ ro: "", vehicle: "", year: "", trans: "68RFE", orderId: "", customer: "" });
  const [lookupStatus, setLookupStatus] = useState("idle"); // idle | loading | found | error
  const [lookupDebug, setLookupDebug] = useState(null);

  // Saved ROs from relay
  const [savedRos, setSavedRos] = useState([]);
  const [loadingRos, setLoadingRos] = useState(false);

  // Stage 1
  const [findings, setFindings] = useState({});
  const [stage1Initials, setStage1Initials] = useState("");
  const [stage1Done, setStage1Done] = useState(false);
  const [stage1CustomRows, setStage1CustomRows] = useState([mkCustomRow(), mkCustomRow(), mkCustomRow(), mkCustomRow()]);
  const [findingsPushStatus, setFindingsPushStatus] = useState("idle");

  // Stage 2
  const [selectedParts, setSelectedParts] = useState({});
  const [partPrices, setPartPrices] = useState({});
  const [partNotes, setPartNotes] = useState({});
  const [stage2Initials, setStage2Initials] = useState("");
  const [failureReason, setFailureReason] = useState("");
  const [stage2Done, setStage2Done] = useState(false);
  const [stage2CustomRows, setStage2CustomRows] = useState([mkCustomRow(), mkCustomRow(), mkCustomRow(), mkCustomRow()]);
  const [catFilter, setCatFilter] = useState("all");

  // Advisor
  const [openPart, setOpenPart] = useState(null);
  const [talkingPoints, setTalkingPoints] = useState({});
  const [tpLoading, setTpLoading] = useState({});
  const [services, setServices] = useState([]);
  const [pushItems, setPushItems] = useState([]);
  const [pushStatus, setPushStatus] = useState("idle");
  const [targetServiceId, setTargetServiceId] = useState(null);
  const [showServicePicker, setShowServicePicker] = useState(false);

  const photoRefs = useRef({});
  const transDef = ALL_TRANS[ro.trans] || ALL_TRANS["68RFE"];
  const makeColor = MAKE_COLORS[transDef.make] || "#888";

  // ── Load saved ROs on mount
  useEffect(() => {
    if (relayUrl) loadSavedRos();
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, [relayUrl]);

  const relay = () => relayUrl.replace(/\/$/, "");

  const loadSavedRos = async () => {
    if (!relayUrl) return;
    setLoadingRos(true);
    try {
      const res = await fetch(relay() + "/api/ro/list");
      const data = await res.json();
      setSavedRos(data.list || []);
    } catch (e) { /* ignore */ }
    setLoadingRos(false);
  };

  // ── Auto-save current RO to relay whenever key state changes
  const saveRoToRelay = async (extra = {}) => {
    if (!relayUrl || !ro.ro) return;
    try {
      await fetch(relay() + "/api/ro/" + encodeURIComponent(ro.ro) + "/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ro: ro.ro, vehicle: ro.vehicle, year: ro.year, trans: ro.trans,
          orderId: ro.orderId, customer: ro.customer,
          findings, stage1Initials, stage1Done,
          stage1CustomRows, selectedParts, partPrices, partNotes,
          stage2Initials, stage2Done, stage2CustomRows,
          stage: tab, ...extra
        })
      });
    } catch (e) { /* ignore */ }
  };

  // ── Load RO from relay
  const loadRoFromRelay = async (roNumber) => {
    if (!relayUrl) return;
    try {
      const res = await fetch(relay() + "/api/ro/" + encodeURIComponent(roNumber) + "/load");
      const data = await res.json();
      if (data.found && data.data) {
        const d = data.data;
        setRo({ ro: d.ro || roNumber, vehicle: d.vehicle || "", year: d.year || "", trans: d.trans || "68RFE", orderId: d.orderId || "", customer: d.customer || "" });
        setFindings(d.findings || {});
        setStage1Initials(d.stage1Initials || "");
        setStage1Done(d.stage1Done || false);
        setStage1CustomRows(d.stage1CustomRows || [mkCustomRow(), mkCustomRow(), mkCustomRow(), mkCustomRow()]);
        setSelectedParts(d.selectedParts || {});
        setPartPrices(d.partPrices || {});
        setPartNotes(d.partNotes || {});
        setStage2Initials(d.stage2Initials || "");
        setStage2Done(d.stage2Done || false);
        setStage2CustomRows(d.stage2CustomRows || [mkCustomRow(), mkCustomRow(), mkCustomRow(), mkCustomRow()]);
        setTab(d.stage || "ro");
        setLookupStatus("found");
        return true;
      }
    } catch (e) { /* ignore */ }
    return false;
  };

  // ── PIN handlers
  const handlePinKey = (key) => {
    const next = pinInput + key;
    setPinInput(next);
    if (next.length === 4) {
      if (next === APP_PIN) { setPinUnlocked(true); setPinError(false); }
      else { setPinError(true); setTimeout(() => { setPinInput(""); setPinError(false); }, 800); return; }
      setPinInput("");
    }
  };

  const handleAdminPinKey = (key) => {
    const next = adminPinInput + key;
    setAdminPinInput(next);
    if (next.length === 4) {
      if (next === ADMIN_PIN) { setAdminUnlocked(true); setShowAdminPin(false); setTab("settings"); }
      else { setPinError(true); setTimeout(() => { setAdminPinInput(""); setPinError(false); }, 800); return; }
      setAdminPinInput("");
    }
  };

  // ── RO Lookup
  const lookupRo = async () => {
    if (!ro.ro) return;
    setLookupStatus("loading");
    setLookupDebug(null);

    // Try relay first
    const loaded = await loadRoFromRelay(ro.ro);
    if (loaded) return;

    // Try Shopmonkey
    if (relayUrl) {
      try {
        const res = await fetch(relay() + "/api/order/lookup?number=" + encodeURIComponent(ro.ro));
        const data = await res.json();
        if (data.found) {
          setRo(r => ({ ...r, vehicle: data.vehicle, year: data.year, orderId: data.orderId, customer: data.customer || "" }));
          setLookupStatus("found");
          return;
        } else {
          setLookupDebug(data);
          setLookupStatus("error");
        }
      } catch (e) {
        setLookupDebug({ error: e.message });
        setLookupStatus("error");
      }
    } else {
      setLookupStatus("error");
    }
  };

  // ── Computed
  const getPrice = (part) => partPrices[part.id] !== undefined ? parseFloat(partPrices[part.id]) || 0 : part.price !== null ? part.price : 0;
  const chosenParts = transDef.parts.filter(p => selectedParts[p.id]);
  const customPartsTotal = stage2CustomRows.reduce((s, r) => s + (parseFloat(r.price) || 0), 0);
  const totalPartsEst = chosenParts.reduce((s, p) => s + getPrice(p), 0) + customPartsTotal;
  const failCount = CHECKLIST.filter(c => findings[c.id]?.status === "Fail").length;
  const attnCount = CHECKLIST.filter(c => findings[c.id]?.status === "Needs Attention").length;
  const flaggedFindings = CHECKLIST.filter(c => findings[c.id]?.status && findings[c.id].status !== "Pass");

  // ── Push removal findings to Shopmonkey as Recommendations line
  const pushFindings = async () => {
    if (!relayUrl || !ro.orderId || flaggedFindings.length === 0) return;
    setFindingsPushStatus("loading");
    try {
      const body = flaggedFindings.map(c => ({
        label: c.label,
        status: findings[c.id].status,
        note: findings[c.id].note || ""
      }));
      const res = await fetch(relay() + "/api/order/" + ro.orderId + "/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ findings: body })
      });
      const data = await res.json();
      setFindingsPushStatus(data.ok ? "success" : "error");
    } catch (e) {
      setFindingsPushStatus("error");
    }
  };

  // ── Push parts + findings to Shopmonkey (combined)
  const pushToShopmonkey = async () => {
    setPushStatus("loading");
    setPushItems([]);
    setShowServicePicker(false);

    const allParts = [
      ...chosenParts.map(p => ({ name: p.name, partNumber: p.part !== "-" ? p.part : "", retailPrice: getPrice(p), supplier: p.supplier !== "-" ? p.supplier : "" })),
      ...[...stage1CustomRows, ...stage2CustomRows].filter(r => r.name).map(r => ({ name: r.name, partNumber: r.part || "", retailPrice: parseFloat(r.price) || 0, supplier: r.supplier || "" }))
    ];

    const results = [];

    try {
      // Step 1: Push findings as Recommendations line
      if (flaggedFindings.length > 0 && ro.orderId) {
        try {
          const findingsBody = flaggedFindings.map(c => ({ label: c.label, status: findings[c.id].status, note: findings[c.id].note || "" }));
          const fRes = await fetch(relay() + "/api/order/" + ro.orderId + "/recommendations", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ findings: findingsBody })
          });
          const fData = await fRes.json();
          results.push({ name: "Recommendations — " + flaggedFindings.length + " finding" + (flaggedFindings.length !== 1 ? "s" : ""), status: fData.ok ? "success" : "error", id: fData.serviceId || "-", line: "Recommendations - Removal Inspection" });
          setPushItems([...results]);
        } catch (e) {
          results.push({ name: "Recommendations push failed", status: "error", id: e.message, line: "" });
          setPushItems([...results]);
        }
      }

      // Step 2: Push all parts — relay auto-creates "Overhaul Transmission" service line
      if (allParts.length > 0) {
        const pRes = await fetch(relay() + "/api/order/" + ro.orderId + "/push-parts", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ parts: allParts })
        });
        const pData = await pRes.json();
        if (pData.ok) {
          for (const r of pData.results) {
            results.push({ name: r.name, status: r.success ? "success" : "error", id: "-", line: pData.serviceName || "Overhaul Transmission" });
          }
        } else {
          results.push({ name: "Parts push failed", status: "error", id: pData.message || "-", line: "" });
        }
        setPushItems([...results]);
      }

      setPushStatus(results.every(r => r.status === "success") ? "success" : "error");
    } catch (e) {
      setPushStatus("error");
      setPushItems([{ name: "Relay Error", status: "error", id: e.message, line: "" }]);
    }
  };

  // ── AI Talking Points
  const loadTalkingPoints = async (part) => {
    if (talkingPoints[part.id]) { setOpenPart(part.id === openPart ? null : part.id); return; }
    setOpenPart(part.id);
    setTpLoading(t => ({ ...t, [part.id]: true }));
    try {
      const price = getPrice(part);
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: "You are a transmission service advisor coach. Generate brief, honest talking points for " + ro.trans + " (" + transDef.make + ") rebuild parts. Plain language only. Respond ONLY with a JSON object with four keys: why, risk, pitch, pair. Each value is one sentence. No markdown, no preamble.",
          messages: [{ role: "user", content: "Part: " + part.name + " (" + (part.part || "no part#") + "). Category: " + part.category + ". " + (price ? "Price: $" + price + "." : "") + " " + (partNotes[part.id] ? "Tech note: " + partNotes[part.id] : "") }]
        })
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setTalkingPoints(t => ({ ...t, [part.id]: parsed }));
    } catch {
      setTalkingPoints(t => ({ ...t, [part.id]: { why: "Recommended replacement during a full transmission rebuild.", risk: "Skipping may lead to early failure and a costly comeback.", pitch: "Since we already have the unit apart, now is the right time to handle this.", pair: "Consider pairing with the matching filter or seal kit." } }));
    }
    setTpLoading(t => ({ ...t, [part.id]: false }));
  };

  // ── Updating finding
  const updateFinding = (id, field, val) => {
    setFindings(f => ({ ...f, [id]: { ...f[id], [field]: val } }));
  };

  // ── Stage sign-off helpers
  const signStage1 = async () => {
    setStage1Done(true);
    setTab("stage2");
    saveRoToRelay({ stage: "stage2", stage1Done: true, stage1Initials });
    if (relayUrl && ro.orderId) {
      try {
        await fetch(relay() + "/api/order/" + ro.orderId + "/note", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: "GearFlow - Stage 1 Removal Inspection complete. Signed off by: " + stage1Initials + ". Findings: " + (flaggedFindings.length > 0 ? flaggedFindings.map(c => "[" + findings[c.id].status + "] " + c.label).join(", ") : "None") })
        });
      } catch (e) { /* ignore */ }
    }
  };

  const signStage2 = async () => {
    setStage2Done(true);
    setTab("advisor");
    saveRoToRelay({ stage: "advisor", stage2Done: true, stage2Initials });
    if (relayUrl && ro.orderId) {
      try {
        await fetch(relay() + "/api/order/" + ro.orderId + "/note", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ note: "GearFlow - Stage 2 Strip Down complete. Signed off by: " + stage2Initials + ". Parts selected: " + chosenParts.length + " (" + chosenParts.map(p => p.name).join(", ") + ")" })
        });
      } catch (e) { /* ignore */ }
    }
  };

  // ── PIN SCREEN ────────────────────────────────────────────────────
  if (!pinUnlocked) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a2230", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Share Tech Mono','Courier New',monospace" }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, letterSpacing: 6, color: "#fff", marginBottom: 4 }}>GEAR<span style={{ color: "#ff6b35" }}>FLOW</span></div>
          <div style={{ color: "#8899aa", fontSize: 11, letterSpacing: 3, marginBottom: 40 }}>MISTER TRANSMISSION</div>
          <div style={{ background: "#111920", borderRadius: 12, padding: 32, minWidth: 280, boxShadow: "0 8px 40px rgba(0,0,0,.4)" }}>
            <div style={{ color: "#8899aa", fontSize: 11, letterSpacing: 3, marginBottom: 20 }}>ENTER PIN</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: i < pinInput.length ? (pinError ? "#f44336" : "#ff6b35") : "#2a3a4a", transition: "all .15s" }} />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "DEL"].map((k, i) => (
                <button key={i} onClick={() => { if (k === "DEL") setPinInput(p => p.slice(0, -1)); else if (k !== "") handlePinKey(String(k)); }}
                  style={{ padding: "16px 0", background: k === "" ? "transparent" : "#1e2d3d", border: "none", borderRadius: 8, color: "#fff", fontSize: 18, cursor: k === "" ? "default" : "pointer", fontFamily: "inherit" }}>{k}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── ADMIN PIN SCREEN ──────────────────────────────────────────────
  if (showAdminPin) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Share Tech Mono',monospace", background: "#e8edf2" }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <div style={{ color: "#8899aa", fontSize: 11, letterSpacing: 3, marginBottom: 20 }}>ADMIN PIN REQUIRED</div>
          <div style={{ background: "#1a2230", borderRadius: 12, padding: 32, minWidth: 280, boxShadow: "0 8px 40px rgba(0,0,0,.2)" }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ width: 18, height: 18, borderRadius: "50%", background: i < adminPinInput.length ? (pinError ? "#f44336" : "#ff6b35") : "#2a3a4a", transition: "all .15s" }} />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "DEL"].map((k, i) => (
                <button key={i} onClick={() => { if (k === "DEL") setAdminPinInput(p => p.slice(0, -1)); else if (k !== "") handleAdminPinKey(String(k)); }}
                  style={{ padding: "16px 0", background: k === "" ? "transparent" : "#1e2d3d", border: "none", borderRadius: 8, color: "#fff", fontSize: 18, cursor: k === "" ? "default" : "pointer", fontFamily: "inherit" }}>{k}</button>
              ))}
            </div>
            <button onClick={() => { setShowAdminPin(false); setAdminPinInput(""); }} style={{ marginTop: 16, background: "transparent", border: "none", color: "#8899aa", cursor: "pointer", fontSize: 11, letterSpacing: 2 }}>CANCEL</button>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN APP ──────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Share Tech Mono','Courier New',monospace", background: "#e8edf2", minHeight: "100vh", color: "#1a2230" }}>
      <style>{CSS}</style>

      {/* HEADER */}
      <div className="hdr">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="logo" style={{ cursor: "pointer" }} onClick={() => { setTab("ro"); if (relayUrl) loadSavedRos(); }}>GEAR<span>FLOW</span></div>
          <span className="live-badge">LIVE</span>
        </div>
        <div className="nav">
          <button className={"nb " + (tab === "ro" ? "on" : "")} onClick={() => { setTab("ro"); if (relayUrl) loadSavedRos(); }}>🏠 RO</button>
          <button className={"nb " + (tab === "stage1" ? "on" : "")} onClick={() => setTab("stage1")} disabled={!ro.ro}>S1: Removal</button>
          <button className={"nb " + (tab === "stage2" ? "on" : "")} onClick={() => setTab("stage2")} disabled={!stage1Done}>S2: Strip</button>
          <button className={"nb " + (tab === "advisor" ? "on" : "")} onClick={() => setTab("advisor")} disabled={!stage2Done}>Advisor</button>
          <button className={"nb " + (tab === "settings" ? "on" : "")} onClick={() => { if (adminUnlocked) setTab("settings"); else { setAdminPinInput(""); setShowAdminPin(true); } }}>⚙</button>
        </div>
      </div>

      {/* ── RO TAB ── */}
      {tab === "ro" && (
        <div className="pg">
          <div className="section-title">New / Resume Service Order</div>

          {/* Saved ROs - prominent cards */}
          {savedRos.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, letterSpacing: 4, color: "#ff6b35", textTransform: "uppercase", marginBottom: 12, paddingBottom: 8, borderBottom: "2px solid #d0d8e0" }}>
                Active Work Orders
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 10 }}>
                {savedRos.map(r => {
                  const stageColors = { ro: "#7a8a9a", stage1: "#ff9800", stage2: "#4fc3f7", advisor: "#22aa55" };
                  const stageLabels = { ro: "RO Entry", stage1: "Stage 1 — Removal", stage2: "Stage 2 — Strip", advisor: "Advisor" };
                  const sc = stageColors[r.stage] || "#7a8a9a";
                  const td = ALL_TRANS[r.trans];
                  return (
                    <div key={r.roNumber} onClick={() => loadRoFromRelay(r.roNumber)}
                      style={{ background: "#fff", border: "2px solid " + sc, borderRadius: 8, padding: 16, cursor: "pointer", transition: "all .15s", boxShadow: "0 2px 8px rgba(0,0,0,.08)" }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 13, color: "#ff6b35", fontWeight: 700 }}>{r.roNumber}</span>
                        <span style={{ fontSize: 8, letterSpacing: 1, textTransform: "uppercase", padding: "3px 8px", borderRadius: 3, background: sc + "22", color: sc, fontWeight: 700 }}>{stageLabels[r.stage] || r.stage}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#1a2230", fontWeight: 600, marginBottom: 4 }}>{r.vehicle || "Vehicle not set"}</div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 10, color: MAKE_COLORS[td?.make] || "#888", fontWeight: 600 }}>{td?.label || r.trans}</span>
                        <span style={{ fontSize: 9, color: "#aabbcc" }}>{new Date(r.updatedAt).toLocaleDateString()} {new Date(r.updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                      <div style={{ marginTop: 10, width: "100%", height: 4, background: "#f0f4f8", borderRadius: 2 }}>
                        <div style={{ height: 4, borderRadius: 2, background: sc, width: r.stage === "ro" ? "10%" : r.stage === "stage1" ? "35%" : r.stage === "stage2" ? "65%" : "100%", transition: "width .3s" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 8, fontSize: 9, color: "#aabbcc", letterSpacing: 1, textAlign: "right" }}>
                {loadingRos ? "Loading..." : savedRos.length + " active RO" + (savedRos.length !== 1 ? "s" : "") + " — tap to resume"}
              </div>
            </div>
          )}

          {/* Lookup */}
          <div style={{ background: "#1a2230", borderRadius: 6, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#8899aa", marginBottom: 10, fontWeight: 700 }}>Shopmonkey RO Lookup</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <input className="finput" style={{ background: "#0d1520", color: "#fff", borderColor: "#3a4a5a", flex: 1, minWidth: 140 }}
                placeholder="Enter RO number"
                value={ro.ro}
                onChange={e => { setRo(r => ({ ...r, ro: e.target.value })); setLookupStatus("idle"); }}
                onKeyDown={e => e.key === "Enter" && lookupRo()} />
              <button onClick={lookupRo} disabled={!ro.ro || lookupStatus === "loading"}
                style={{ padding: "10px 18px", background: "#ff6b35", color: "#fff", border: "none", borderRadius: 4, fontFamily: "'Orbitron',sans-serif", fontSize: 10, letterSpacing: 2, cursor: "pointer", flexShrink: 0, opacity: !ro.ro || lookupStatus === "loading" ? .5 : 1 }}>
                {lookupStatus === "loading" ? "Searching..." : "Lookup RO →"}
              </button>
            </div>
            {lookupStatus === "found" && (
              <div style={{ marginTop: 10, padding: "8px 12px", background: "#22aa5522", border: "1px solid #22aa55", borderRadius: 4, fontSize: 11, color: "#22aa55", fontWeight: 600 }}>
                ✓ Found — {ro.vehicle} · {ro.year} {ro.orderId && <span style={{ fontSize: 9, opacity: .7 }}>· ID: {ro.orderId}</span>}
              </div>
            )}
            {lookupStatus === "error" && (
              <div style={{ marginTop: 10, padding: "10px 12px", background: "#f4433622", border: "1px solid #f44336", borderRadius: 4, fontSize: 11, color: "#f44336" }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>✗ Not found. Fill in manually below or check relay URL in Settings.</div>
              </div>
            )}
          </div>

          {/* Manual fields */}
          <div className="ro-grid">
            <div className="fld">
              <label className="flbl">Year</label>
              <input className="finput" placeholder="2021" value={ro.year} onChange={e => setRo(r => ({ ...r, year: e.target.value }))} />
            </div>
            <div className="fld" style={{ gridColumn: "1/-1" }}>
              <label className="flbl">Vehicle</label>
              <input className="finput" placeholder="2021 Ram 3500 6.7L Cummins" value={ro.vehicle} onChange={e => setRo(r => ({ ...r, vehicle: e.target.value }))} />
            </div>
          </div>

          {/* Trans picker */}
          <div className="section-title">Select Service Type</div>
          {TRANS_GROUPS.map(g => (
            <div key={g.label} style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: g.color, fontWeight: 700, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 2, background: g.color }} />{g.label}
              </div>
              <div className="trans-grid">
                {g.keys.map(k => {
                  const td = ALL_TRANS[k];
                  if (!td) return null;
                  return (
                    <div key={k} className={"trans-card " + (ro.trans === k ? "sel" : "")} style={{ "--mc": MAKE_COLORS[td.make] || g.color }} onClick={() => setRo(r => ({ ...r, trans: k }))}>
                      {td.icon && <div style={{ fontSize: 18, marginBottom: 4 }}>{td.icon}</div>}
                      <div className="trans-label">{td.label}</div>
                      <div className="trans-make">{td.make}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <button className="go-btn" disabled={!ro.ro || !ro.vehicle} onClick={() => { setTab("stage1"); saveRoToRelay({ stage: "stage1" }); }}>
            Start Stage 1 — Removal →
          </button>
        </div>
      )}

      {/* ── STAGE 1 TAB ── */}
      {tab === "stage1" && (
        <>
          <div className="pg">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div className="section-title" style={{ marginBottom: 2 }}>Stage 1 — Removal Inspection</div>
                <div style={{ fontSize: 10, color: "#334455", letterSpacing: 1 }}>{ro.vehicle} · {ro.ro} · <span style={{ color: makeColor }}>{transDef.label}</span></div>
              </div>
              <div className="stats-row" style={{ margin: 0, width: "auto" }}>
                <div className="stat-box"><div className="stat-val" style={{ color: "#f44336" }}>{failCount}</div><div className="stat-lbl">Fail</div></div>
                <div className="stat-box"><div className="stat-val" style={{ color: "#ff9800" }}>{attnCount}</div><div className="stat-lbl">Attn</div></div>
                <div className="stat-box"><div className="stat-val" style={{ color: "#4caf50" }}>{CHECKLIST.filter(c => findings[c.id]?.status === "Pass").length}</div><div className="stat-lbl">Pass</div></div>
              </div>
            </div>

            {Object.entries(CHECKLIST_CATS).map(([catKey, cat]) => {
              const items = CHECKLIST.filter(c => c.category === catKey);
              const done = items.filter(c => findings[c.id]?.status).length;
              return (
                <div key={catKey} className="rem-cat">
                  <div className="cat-bar">
                    <div className="cat-pip" style={{ background: cat.color }} />
                    <span className="cat-name">{cat.label}</span>
                    <span className="cat-ct">{done}/{items.length}</span>
                  </div>
                  {items.map(item => {
                    const f = findings[item.id] || {};
                    return (
                      <div key={item.id} className="rem-item">
                        <div className="rem-item-top">
                          <span className="rem-item-label">{item.label}</span>
                          <div className="status-btns">
                            {STATUSES.map(s => (
                              <button key={s} className={"sbtn " + (f.status === s ? "on" : "")}
                                style={f.status === s ? { background: STATUS_COLORS[s], borderColor: STATUS_COLORS[s] } : {}}
                                onClick={() => updateFinding(item.id, "status", f.status === s ? "" : s)}>
                                {s === "Needs Attention" ? "Attn" : s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="rem-bottom">
                          <input className="note-in" placeholder="Tech note..." value={f.note || ""} onChange={e => updateFinding(item.id, "note", e.target.value)} />
                          {item.photo && (
                            <>
                              <input type="file" accept="image/*" capture="environment" style={{ display: "none" }} ref={el => photoRefs.current[item.id] = el}
                                onChange={e => { const file = e.target.files[0]; if (file) updateFinding(item.id, "photo", URL.createObjectURL(file)); }} />
                              <button className={"photo-btn " + (f.photo ? "has" : "")} onClick={() => photoRefs.current[item.id]?.click()}>
                                {f.photo ? "📷 Photo Taken" : "📷 Add Photo"}
                              </button>
                            </>
                          )}
                        </div>
                        {f.photo && <img src={f.photo} alt="finding" style={{ marginTop: 6, width: "100%", maxHeight: 120, objectFit: "cover", borderRadius: 3 }} />}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Findings summary - pushed via Advisor */}
            {flaggedFindings.length > 0 && (
              <div style={{ background: "#fff8f5", border: "2px solid #ff6b35", borderRadius: 6, padding: 14, marginTop: 16 }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "#ff6b35", fontWeight: 700, marginBottom: 6 }}>
                  {flaggedFindings.length} Finding{flaggedFindings.length !== 1 ? "s" : ""} Flagged
                </div>
                <div style={{ fontSize: 11, color: "#4a5a6a" }}>
                  These will be pushed to Shopmonkey as Recommendations when the Advisor sends the work order.
                </div>
              </div>
            )}

            {/* Custom rows */}
            <div className="custom-section">
              <div className="custom-title">Additional Parts Required — Removal Tech</div>
              {stage1CustomRows.map((row, i) => (
                <div key={i} className="custom-row">
                  <input className="ci" placeholder="Part name" value={row.name} onChange={e => { const r = [...stage1CustomRows]; r[i] = { ...r[i], name: e.target.value }; setStage1CustomRows(r); }} />
                  <input className="ci" placeholder="Part #" value={row.part} onChange={e => { const r = [...stage1CustomRows]; r[i] = { ...r[i], part: e.target.value }; setStage1CustomRows(r); }} />
                  <input className="ci" placeholder="Supplier" value={row.supplier} onChange={e => { const r = [...stage1CustomRows]; r[i] = { ...r[i], supplier: e.target.value }; setStage1CustomRows(r); }} />
                  <input className="ci" placeholder="$" value={row.price} onChange={e => { const r = [...stage1CustomRows]; r[i] = { ...r[i], price: e.target.value }; setStage1CustomRows(r); }} />
                </div>
              ))}
            </div>

            <div className="sign-bar">
              <span className="sign-label">Removal Tech Sign-Off</span>
              <input className="init-in" placeholder="INI" maxLength={4} value={stage1Initials} onChange={e => setStage1Initials(e.target.value.toUpperCase())} disabled={stage1Done} />
              <button className={"sign-btn " + (stage1Done ? "done" : "")} disabled={stage1Initials.length < 2 || stage1Done} onClick={signStage1}>
                {stage1Done ? "✓ Signed — " + stage1Initials : "Sign & Advance to Strip →"}
              </button>
            </div>
            <div style={{ height: 70 }} />
          </div>
        </>
      )}

      {/* ── STAGE 2 TAB ── */}
      {tab === "stage2" && (
        <>
          <div className="pg">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
              <div>
                <div className="section-title" style={{ marginBottom: 2 }}>Stage 2 — Strip Down & Parts</div>
                <div style={{ fontSize: 10, color: "#334455", letterSpacing: 1 }}>{ro.vehicle} · {ro.ro} · <span style={{ color: makeColor }}>{transDef.label}</span> · S1: <span style={{ color: "#00cfff" }}>{stage1Initials}</span></div>
              </div>
            </div>

            {flaggedFindings.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#2a3a4a", marginBottom: 8 }}>Stage 1 Flags from {stage1Initials}</div>
                {flaggedFindings.map(c => (
                  <div key={c.id} className="flag-item" style={{ "--fc": STATUS_COLORS[findings[c.id].status] }}>
                    <span className="flag-status">{findings[c.id].status}</span>
                    <span className="flag-name">{c.label}</span>
                    {findings[c.id].note && <span className="flag-note">{findings[c.id].note}</span>}
                  </div>
                ))}
              </div>
            )}

            <div className="filter-bar">
              <button className={"fcb " + (catFilter === "all" ? "on" : "")} style={{ "--c": "#00cfff" }} onClick={() => setCatFilter("all")}>All</button>
              {Object.entries(transDef.categories).map(([k, cat]) => (
                <button key={k} className={"fcb " + (catFilter === k ? "on" : "")} style={{ "--c": cat.color }} onClick={() => setCatFilter(k)}>{cat.label}</button>
              ))}
            </div>

            {Object.entries(transDef.categories).filter(([k]) => catFilter === "all" || catFilter === k).map(([catKey, cat]) => {
              const parts = transDef.parts.filter(p => p.category === catKey);
              const selCount = parts.filter(p => selectedParts[p.id]).length;
              return (
                <div key={catKey} className="cat-block">
                  <div className="cat-bar">
                    <div className="cat-pip" style={{ background: cat.color }} />
                    <span className="cat-name">{cat.label}</span>
                    <span className="cat-ct">{selCount}/{parts.length}</span>
                  </div>
                  <div className="parts-grid">
                    {parts.map(part => {
                      const sel = !!selectedParts[part.id];
                      const hasFixedPrice = part.price !== null;
                      return (
                        <div key={part.id} className={"pc " + (sel ? "sel" : "")} style={{ "--c": cat.color }} onClick={() => setSelectedParts(s => ({ ...s, [part.id]: !s[part.id] }))}>
                          {sel && <div className="chk">✓</div>}
                          <div className="pc-name">{part.name}</div>
                          {part.part && part.part !== "-" && <div className="pc-num">{part.part}</div>}
                          {part.supplier && part.supplier !== "-" && <span className="pc-sup">{part.supplier}</span>}
                          {sel && (
                            <div className="pc-price-row" onClick={e => e.stopPropagation()}>
                              {hasFixedPrice
                                ? <span className="pfixed">${part.price}</span>
                                : <input className="pi" placeholder="$ price" value={partPrices[part.id] || ""} onChange={e => setPartPrices(p => ({ ...p, [part.id]: e.target.value }))} />
                              }
                            </div>
                          )}
                          {sel && (
                            <textarea className="pc-note" placeholder="Lead tech note..." value={partNotes[part.id] || ""} onChange={e => setPartNotes(n => ({ ...n, [part.id]: e.target.value }))} onClick={e => e.stopPropagation()} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <div className="custom-section">
              <div className="custom-title">Additional Parts — Strip Down Tech</div>
              {stage2CustomRows.map((row, i) => (
                <div key={i} className="custom-row">
                  <input className="ci" placeholder="Part name" value={row.name} onChange={e => { const r = [...stage2CustomRows]; r[i] = { ...r[i], name: e.target.value }; setStage2CustomRows(r); }} />
                  <input className="ci" placeholder="Part #" value={row.part} onChange={e => { const r = [...stage2CustomRows]; r[i] = { ...r[i], part: e.target.value }; setStage2CustomRows(r); }} />
                  <input className="ci" placeholder="Supplier" value={row.supplier} onChange={e => { const r = [...stage2CustomRows]; r[i] = { ...r[i], supplier: e.target.value }; setStage2CustomRows(r); }} />
                  <input className="ci" placeholder="$" value={row.price} onChange={e => { const r = [...stage2CustomRows]; r[i] = { ...r[i], price: e.target.value }; setStage2CustomRows(r); }} />
                </div>
              ))}
            </div>

            {/* Failure Reason */}
            <div style={{ background: "#fff", border: "2px solid #d0d8e0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#1a2230", marginBottom: 8 }}>Reason for Failure</div>
              <textarea
                placeholder="Describe why the unit failed (e.g. burnt clutches due to low fluid, worn pump gears, broken sun shell...)"
                value={failureReason}
                onChange={e => setFailureReason(e.target.value)}
                disabled={stage2Done}
                style={{ width: "100%", minHeight: 80, padding: "10px 12px", border: "1px solid #d0d8e0", borderRadius: 6, fontFamily: "'Share Tech Mono',monospace", fontSize: 11, color: "#1a2230", background: stage2Done ? "#f5f8fb" : "#fff", resize: "vertical", boxSizing: "border-box" }}
              />
            </div>

            <div className="sign-bar">
              <span className="sign-label">Lead Tech Sign-Off</span>
              <input className="init-in" placeholder="INI" maxLength={4} value={stage2Initials} onChange={e => setStage2Initials(e.target.value.toUpperCase())} disabled={stage2Done} />
              <button className={"sign-btn " + (stage2Done ? "done" : "")} disabled={stage2Initials.length < 2 || stage2Done || chosenParts.length === 0} onClick={signStage2}>
                {stage2Done ? "✓ Approved — " + stage2Initials : "Approve & Send to Advisor →"}
              </button>
            </div>
            <div style={{ height: 70 }} />
          </div>

          <div className="sticky-bot">
            <div className="sb-stat"><span className="sb-lbl">Parts</span><span className="sb-val og">{chosenParts.length}</span></div>
            <div className="sb-stat"><span className="sb-lbl">Est. Total</span><span className="sb-val gn">{totalPartsEst > 0 ? "$" + totalPartsEst.toLocaleString() : "—"}</span></div>
            <div style={{ flex: 1 }} />
            <button className="act-btn primary" onClick={() => saveRoToRelay()}>💾 Save Progress</button>
          </div>
        </>
      )}

      {/* ── ADVISOR TAB ── */}
      {tab === "advisor" && (
        <div className="pg">
          {stage2Done ? (
            <>
              <div style={{ marginBottom: 16 }}>
                <div className="section-title" style={{ marginBottom: 2 }}>Advisor Quote Sheet</div>
                <div style={{ fontSize: 10, color: "#334455", letterSpacing: 1 }}>
                  {ro.vehicle} · {ro.ro} · <span style={{ color: makeColor }}>{transDef.label}</span>
                  {" · S1: "}<span style={{ color: "#00cfff" }}>{stage1Initials}</span>
                  {" · S2: "}<span style={{ color: "#4caf50" }}>{stage2Initials}</span>
                </div>
              </div>

              <div className="adv-cards">
                <div className="adv-stat"><div className="adv-stat-lbl">Parts Selected</div><div className="adv-stat-val" style={{ color: "#ff6b35" }}>{chosenParts.length}</div></div>
                <div className="adv-stat"><div className="adv-stat-lbl">Est. Parts Cost</div><div className="adv-stat-val" style={{ color: "#4caf50" }}>{totalPartsEst > 0 ? "$" + totalPartsEst.toLocaleString() : "—"}</div></div>
                <div className="adv-stat"><div className="adv-stat-lbl">Stage 1 Flags</div><div className="adv-stat-val" style={{ color: "#ff9800" }}>{failCount + attnCount}</div></div>
              </div>

              {flaggedFindings.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#2a3a4a", marginBottom: 8 }}>Removal Findings — Tech {stage1Initials}</div>
                  {flaggedFindings.map(c => (
                    <div key={c.id} className="flag-item" style={{ "--fc": STATUS_COLORS[findings[c.id].status] }}>
                      <span className="flag-status">{findings[c.id].status}</span>
                      <span className="flag-name">{c.label}</span>
                      {findings[c.id].note && <span className="flag-note">{findings[c.id].note}</span>}
                    </div>
                  ))}
                </div>
              )}

              <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#2a3a4a", marginBottom: 10 }}>Parts — Tap for Talking Points</div>

              {chosenParts.map(part => {
                const cat = transDef.categories[part.category];
                const price = getPrice(part);
                const isOpen = openPart === part.id;
                const tp = talkingPoints[part.id];
                const loading = tpLoading[part.id];
                return (
                  <div key={part.id} className={"adv-item " + (isOpen ? "open" : "")}>
                    <div className="adv-hdr" onClick={() => loadTalkingPoints(part)}>
                      <div className="adv-info">
                        <div className="adv-name">{part.name}</div>
                        <div className="adv-sub" style={{ color: cat?.color }}>{cat?.label}</div>
                        {part.part && part.part !== "-" && <div className="adv-num">{part.part} · {part.supplier}</div>}
                      </div>
                      {price > 0 && <div className="adv-price">${price.toLocaleString()}</div>}
                      <div className="adv-arr">▶</div>
                    </div>
                    {isOpen && (
                      <div className="tp-wrap">
                        {loading ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#7a8a9a", fontSize: 10 }}><div className="spin" />Generating talking points...</div>
                        ) : tp ? (
                          <>
                            <div className="tp-pitch"><div className="tp-pitch-lbl">💬 Say This</div><div className="tp-pitch-txt">"{tp.pitch}"</div></div>
                            <div className="tp-row">
                              <div className="tp-c"><div className="tp-cl">Why It Matters</div><div className="tp-ct">{tp.why}</div></div>
                              <div className="tp-c"><div className="tp-cl">Risk of Skipping</div><div className="tp-ct">{tp.risk}</div></div>
                            </div>
                            <div className="tp-pair"><div className="tp-cl">💡 Pair With</div><div className="tp-ct">{tp.pair}</div></div>
                            {partNotes[part.id] && <div style={{ marginTop: 8, padding: "7px 11px", background: "#f5f8fb", borderLeft: "3px solid #c0ccd8", fontSize: 10, color: "#4a5a6a", fontStyle: "italic" }}>Lead tech note: {partNotes[part.id]}</div>}
                          </>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Custom parts summary */}
              {[...stage1CustomRows, ...stage2CustomRows].filter(r => r.name).length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#2a3a4a", marginBottom: 8 }}>Additional Parts by Techs</div>
                  {[...stage1CustomRows.map(r => ({ ...r, stage: "S1" })), ...stage2CustomRows.map(r => ({ ...r, stage: "S2" }))].filter(r => r.name).map((r, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 14px", background: "#fff", borderRadius: 4, marginBottom: 5, border: "1px solid #d0d8e0" }}>
                      <span style={{ fontSize: 8, letterSpacing: 1, color: "#00cfff", background: "#00cfff11", padding: "2px 6px", borderRadius: 2 }}>{r.stage}</span>
                      <span style={{ flex: 1, fontSize: 11, color: "#1a2230" }}>{r.name}</span>
                      {r.supplier && <span style={{ fontSize: 9, color: "#7a8a9a" }}>{r.supplier}</span>}
                      {r.price && <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 14, color: "#4caf50" }}>${parseFloat(r.price).toLocaleString()}</span>}
                    </div>
                  ))}
                </div>
              )}

              <div className="total-row">
                <span style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#2a3a4a" }}>Total Parts Est.</span>
                <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 28, letterSpacing: 3, color: "#4caf50" }}>{totalPartsEst > 0 ? "$" + totalPartsEst.toLocaleString() : "—"}</span>
              </div>

              {/* Push to Shopmonkey */}
              <div style={{ marginTop: 24, background: "#1a2230", borderRadius: 8, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, letterSpacing: 3, color: "#fff", marginBottom: 3 }}>PUSH TO SHOPMONKEY</div>
                    <div style={{ fontSize: 9, color: "#8899aa", letterSpacing: 1 }}>
                      Targeting RO {ro.ro} · Sends parts + {flaggedFindings.length} recommendation{flaggedFindings.length !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <button onClick={() => pushToShopmonkey()}
                    disabled={pushStatus === "loading" || pushStatus === "success" || (chosenParts.length === 0 && stage2CustomRows.filter(r => r.name).length === 0)}
                    style={{ padding: "12px 24px", border: "none", borderRadius: 5, fontFamily: "'Orbitron',sans-serif", fontSize: 10, letterSpacing: 3, fontWeight: 700, cursor: "pointer", background: pushStatus === "success" ? "#22aa55" : pushStatus === "error" ? "#f44336" : "#ff6b35", color: "#fff", opacity: pushStatus === "loading" ? .7 : 1 }}>
                    {pushStatus === "idle" && "Push Parts + Findings →"}
                    {pushStatus === "loading" && "Pushing..."}
                    {pushStatus === "success" && "✓ Pushed to Work Order"}
                    {pushStatus === "error" && "⚠ Some Items Failed"}
                  </button>
                </div>

                {/* Service picker */}
                {showServicePicker && services.length > 0 && (
                  <div style={{ background: "#0d1520", borderRadius: 6, padding: 16, border: "2px solid #ff9800", marginBottom: 14 }}>
                    <div style={{ fontSize: 10, color: "#ff9800", fontWeight: 700, marginBottom: 10 }}>Select the target service line:</div>
                    {services.map(s => (
                      <button key={s.id} onClick={() => pushToShopmonkey(s.id)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "11px 14px", background: "#111d2a", border: "2px solid #2a3a4a", borderRadius: 5, cursor: "pointer", marginBottom: 6, color: "#c0ccd8", fontSize: 12 }}>
                        <span>{s.name}</span>
                        {s.laborPrice > 0 && <span style={{ color: "#7a8a9a" }}>${s.laborPrice.toLocaleString()}</span>}
                      </button>
                    ))}
                  </div>
                )}

                {pushItems.length > 0 && (
                  <div>
                    <div style={{ maxHeight: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                      {pushItems.map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", background: "#0d1520", borderRadius: 4, borderLeft: "3px solid " + (item.status === "success" ? "#22aa55" : "#f44336") }}>
                          <span style={{ color: item.status === "success" ? "#22aa55" : "#f44336", flexShrink: 0 }}>{item.status === "success" ? "✓" : "✗"}</span>
                          <span style={{ flex: 1, fontSize: 11, color: "#c0ccd8" }}>{item.name}</span>
                        </div>
                      ))}
                    </div>
                    {pushStatus === "success" && (
                      <div style={{ marginTop: 12, padding: "10px 14px", background: "#22aa5522", border: "1px solid #22aa55", borderRadius: 4, fontSize: 11, color: "#22aa55", fontWeight: 700, textAlign: "center" }}>
                        ✓ {pushItems.length} item{pushItems.length !== 1 ? "s" : ""} added to Shopmonkey
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── QUOTE SHEET — appears automatically after successful push ── */}
              {pushStatus === "success" && (
                <div style={{ marginTop: 24, background: "#fff", border: "2px solid #d0d8e0", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.1)" }} id="quote-sheet">
                  {/* Header */}
                  <div style={{ background: "#1a2230", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 20, letterSpacing: 4, color: "#fff" }}>GEAR<span style={{ color: "#ff6b35" }}>FLOW</span></div>
                      <div style={{ fontSize: 9, letterSpacing: 2, color: "#8899aa", marginTop: 3 }}>MISTER TRANSMISSION</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 14, color: "#ff6b35" }}>QUOTE</div>
                      <div style={{ fontSize: 10, color: "#8899aa", marginTop: 2 }}>{new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}</div>
                    </div>
                  </div>

                  {/* Vehicle & RO info */}
                  <div style={{ padding: "16px 24px", borderBottom: "2px solid #f0f4f8", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", marginBottom: 4 }}>Vehicle</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2230" }}>{ro.vehicle || "—"}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", marginBottom: 4 }}>RO Number</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#1a2230" }}>{ro.ro}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", marginBottom: 4 }}>Transmission</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: makeColor }}>{transDef.label}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", marginBottom: 4 }}>Technicians</div>
                      <div style={{ fontSize: 11, color: "#1a2230" }}>S1: <strong>{stage1Initials}</strong> &nbsp; S2: <strong>{stage2Initials}</strong></div>
                    </div>
                  </div>

                  {/* Parts list */}
                  <div style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#ff6b35", fontWeight: 700, marginBottom: 12 }}>Parts — Overhaul Transmission</div>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                      <thead>
                        <tr style={{ borderBottom: "2px solid #e8edf2" }}>
                          <th style={{ textAlign: "left", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", padding: "6px 0", fontWeight: 600 }}>Part</th>
                          <th style={{ textAlign: "left", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", padding: "6px 0", fontWeight: 600 }}>Part #</th>
                          <th style={{ textAlign: "left", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", padding: "6px 0", fontWeight: 600 }}>Supplier</th>
                          <th style={{ textAlign: "right", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#7a8a9a", padding: "6px 0", fontWeight: 600 }}>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chosenParts.map((part, i) => {
                          const price = getPrice(part);
                          return (
                            <tr key={part.id} style={{ borderBottom: "1px solid #f0f4f8", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                              <td style={{ padding: "8px 0", fontSize: 12, color: "#1a2230", fontWeight: 500 }}>{part.name}</td>
                              <td style={{ padding: "8px 0", fontSize: 10, color: "#7a8a9a", fontFamily: "'Share Tech Mono',monospace" }}>{part.part !== "-" ? part.part : "—"}</td>
                              <td style={{ padding: "8px 0", fontSize: 10, color: "#7a8a9a" }}>{part.supplier !== "-" ? part.supplier : "—"}</td>
                              <td style={{ padding: "8px 0", fontSize: 12, color: price > 0 ? "#1a2230" : "#c0ccd8", textAlign: "right", fontWeight: price > 0 ? 700 : 400 }}>{price > 0 ? "$" + price.toLocaleString() : "—"}</td>
                            </tr>
                          );
                        })}
                        {[...stage1CustomRows, ...stage2CustomRows].filter(r => r.name).map((r, i) => (
                          <tr key={"c" + i} style={{ borderBottom: "1px solid #f0f4f8", background: (chosenParts.length + i) % 2 === 0 ? "#fff" : "#fafbfc" }}>
                            <td style={{ padding: "8px 0", fontSize: 12, color: "#1a2230", fontWeight: 500 }}>{r.name}</td>
                            <td style={{ padding: "8px 0", fontSize: 10, color: "#7a8a9a", fontFamily: "'Share Tech Mono',monospace" }}>{r.part || "—"}</td>
                            <td style={{ padding: "8px 0", fontSize: 10, color: "#7a8a9a" }}>{r.supplier || "—"}</td>
                            <td style={{ padding: "8px 0", fontSize: 12, color: "#1a2230", textAlign: "right", fontWeight: 700 }}>{r.price ? "$" + parseFloat(r.price).toLocaleString() : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* Total */}
                    <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 16, marginTop: 16, paddingTop: 14, borderTop: "2px solid #1a2230" }}>
                      <span style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#4a5a6a", fontWeight: 600 }}>Estimated Parts Total</span>
                      <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 24, letterSpacing: 2, color: "#1a2230", fontWeight: 800 }}>${totalPartsEst.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {flaggedFindings.length > 0 && (
                    <div style={{ padding: "16px 24px", borderTop: "2px solid #f0f4f8", background: "#fffbf8" }}>
                      <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#ff6b35", fontWeight: 700, marginBottom: 10 }}>Recommendations — Removal Inspection</div>
                      {flaggedFindings.map(c => (
                        <div key={c.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 7, padding: "8px 10px", background: "#fff", borderRadius: 4, borderLeft: "3px solid " + (STATUS_COLORS[findings[c.id].status] || "#ccc") }}>
                          <span style={{ fontSize: 9, letterSpacing: 1, textTransform: "uppercase", color: STATUS_COLORS[findings[c.id].status], fontWeight: 700, minWidth: 90, flexShrink: 0 }}>{findings[c.id].status}</span>
                          <div>
                            <div style={{ fontSize: 12, color: "#1a2230", fontWeight: 500 }}>{c.label}</div>
                            {findings[c.id].note && <div style={{ fontSize: 10, color: "#7a8a9a", marginTop: 2 }}>{findings[c.id].note}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ padding: "14px 24px", background: "#f5f8fb", borderTop: "2px solid #e8edf2", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 9, color: "#aabbcc", letterSpacing: 1 }}>Generated by GearFlow · {new Date().toLocaleString()}</div>
                    <button onClick={() => window.print()} style={{ padding: "7px 16px", background: "#1a2230", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer" }}>
                      🖨 Print / Save PDF
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="empty"><div className="empty-ico">🔒</div><div className="empty-txt">Awaiting Stage 2 lead tech approval.</div></div>
          )}
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {tab === "settings" && (
        <div className="pg">
          <div className="section-title">Settings & Shopmonkey API</div>

          <div style={{ background: "#fff", border: "2px solid #d0d8e0", borderRadius: 8, padding: 20, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1a2230", marginBottom: 4, letterSpacing: 1 }}>Railway Relay URL</div>
            <div style={{ fontSize: 11, color: "#7a8a9a", marginBottom: 12 }}>Saved automatically to this device.</div>
            <div className="fld">
              <label className="flbl">Relay URL</label>
              <input className="finput" placeholder="https://your-relay.up.railway.app" value={relayUrl} onChange={e => setRelayUrl(e.target.value)} />
            </div>
            {relayUrl && (
              <button onClick={async () => {
                try {
                  const res = await fetch(relay() + "/health");
                  const data = await res.json();
                  alert("✓ Relay connected!\n" + JSON.stringify(data, null, 2));
                } catch (e) { alert("✗ Could not reach relay:\n" + e.message); }
              }} style={{ marginTop: 10, padding: "8px 16px", background: "#1a2230", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer" }}>
                Test Connection →
              </button>
            )}
          </div>

          <div style={{ background: "#fff", border: "2px solid #d0d8e0", borderRadius: 8, padding: 20, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1a2230", marginBottom: 4, letterSpacing: 1 }}>Shopmonkey API Key</div>
            <div style={{ fontSize: 11, color: "#7a8a9a", marginBottom: 12 }}>Stored locally. Create a restricted key in Shopmonkey → Settings → Integrations → API with Work Orders (read) and Line Items (write) permissions.</div>
            <div className="fld">
              <label className="flbl">API Key</label>
              <input className="finput" type="password" placeholder="sm_live_xxxxxxxxxxxx" value={apiKey} onChange={e => setApiKey(e.target.value)} />
            </div>
            {apiKey && <div style={{ marginTop: 10, padding: "8px 12px", background: "#f0fff5", border: "1px solid #22aa55", borderRadius: 4, fontSize: 11, color: "#22aa55", fontWeight: 600 }}>✓ API key saved</div>}
          </div>

          <div style={{ background: "#fff", border: "2px solid #d0d8e0", borderRadius: 8, padding: 20, boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1a2230", marginBottom: 10, letterSpacing: 1 }}>Saved ROs on Relay ({savedRos.length})</div>
            <button onClick={loadSavedRos} style={{ padding: "7px 14px", background: "#1a2230", border: "none", borderRadius: 4, color: "#fff", fontFamily: "'Share Tech Mono',monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer", marginBottom: 12 }}>Refresh List</button>
            {savedRos.map(r => (
              <div key={r.roNumber} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#f5f8fb", borderRadius: 4, marginBottom: 5, border: "1px solid #e0e8f0" }}>
                <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: 11, color: "#ff6b35", minWidth: 80, fontWeight: 700 }}>{r.roNumber}</span>
                <span style={{ fontSize: 11, color: "#1a2230", flex: 1 }}>{r.vehicle || "—"}</span>
                <span style={{ fontSize: 9, color: "#7a8a9a" }}>{new Date(r.updatedAt).toLocaleString()}</span>
              </div>
            ))}
            {savedRos.length === 0 && <div style={{ fontSize: 11, color: "#7a8a9a" }}>No saved ROs yet.</div>}
          </div>
        </div>
      )}
    </div>
  );
}
