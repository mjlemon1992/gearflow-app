import { useState, useRef } from “react”;

// — TRANSMISSION DATA ––––––––––––––––––––––––––––
const TRANSMISSIONS = {
“68RFE”: {
label: “68RFE”, make: “Dodge/Ram”,
categories: {
overhaul: { label: “Overhaul / Kits”, color: “#ff6b35” },
friction: { label: “Friction & Clutch”, color: “#f0c040” },
electrical: { label: “Solenoids & Electrical”, color: “#4fc3f7” },
pump: { label: “Pump Assembly”, color: “#81c784” },
valvebody: { label: “Valve Body & Plates”, color: “#ce93d8” },
filter: { label: “Filter & Pan”, color: “#80cbc4” },
hardparts: { label: “Hard Parts”, color: “#ff8a65” },
},
parts: [
{ id:“68_molar”,     name:“Molar Overhaul Kit”,              part:“D72002C”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“68_bushing”,   name:“Bushing Kit”,                     part:“DB72030B”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“68_surecure”,  name:“Surecure Kit”,                    part:“S72174A”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“68_piston”,    name:“Piston Set”,                      part:“72960CK”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“68_frict_bw”,  name:“Friction Module Borg Warner”,     part:“72119A”,         supplier:“KING”,   category:“friction”,  price:null },
{ id:“68_alto_g3”,   name:“Power Pack Clutch Kit Alto G3”,   part:“72101CAHPPK-1”,  supplier:“KING”,   category:“friction”,  price:null },
{ id:“68_hd_od_ud”,  name:“HD Friction Module Alto OD/UD”,   part:“A72102AAHPK”,    supplier:“KING”,   category:“friction”,  price:null },
{ id:“68_steel”,     name:“Steel Module”,                    part:”-”,              supplier:”-”,      category:“friction”,  price:null },
{ id:“68_misc_pp”,   name:“Misc Pressure Plate”,             part:”-”,              supplier:”-”,      category:“friction”,  price:null },
{ id:“68_od_rev”,    name:“OD-REV Pressure Plate Modified”,  part:“Modified”,       supplier:”-”,      category:“friction”,  price:30   },
{ id:“68_sol19”,     name:“Solenoid Body 2019+”,             part:“72720B”,         supplier:“KING”,   category:“electrical”,price:null },
{ id:“68_sol_grey”,  name:“Solenoid Body Grey”,              part:“D72420B”,        supplier:“KING”,   category:“electrical”,price:null },
{ id:“68_transducer”,name:“Transducer Mopar”,                part:“D72415”,         supplier:“KING”,   category:“electrical”,price:null },
{ id:“68_tcc”,       name:“OS TCC Switch Valve”,             part:“44912-08K”,      supplier:”-”,      category:“electrical”,price:null },
{ id:“68_pump_bg”,   name:“Pump Body and Gears”,             part:“DR72500C”,       supplier:“KING”,   category:“pump”,      price:null },
{ id:“68_pump_gs”,   name:“Pump Gear Set”,                   part:“A72530B”,        supplier:“KING”,   category:“pump”,      price:null },
{ id:“68_pump_core”, name:“Pump Core (if unrepairable)”,     part:”-”,              supplier:”-”,      category:“pump”,      price:300  },
{ id:“68_sep_plate”, name:“High Pressure Separator Plate”,   part:“A72747BA-MOD”,   supplier:“PARTS4”, category:“valvebody”, price:null },
{ id:“68_billet_ch”, name:“Billet Channel Plate”,            part:“R72741CHP”,      supplier:“PARTS4”, category:“valvebody”, price:null },
{ id:“68_od_snap”,   name:“OD Snap Ring Tapered”,            part:”-”,              supplier:”-”,      category:“valvebody”, price:null },
{ id:“68_pan_flt”,   name:“Pan Filter”,                      part:“A72010BA”,       supplier:“KING”,   category:“filter”,    price:null },
{ id:“68_spin_flt”,  name:“Filter Spin-On”,                  part:“72013A”,         supplier:“KING”,   category:“filter”,    price:null },
{ id:“68_pan_drip”,  name:“Pan with Drip Plug”,              part:“A72765AA-Q”,     supplier:“KING”,   category:“filter”,    price:null },
{ id:“68_deep_pan”,  name:“Deep Aluminium Pan”,              part:“A72765BA-Q”,     supplier:“KING”,   category:“filter”,    price:null },
{ id:“68_tc”,        name:“Torque Converter”,                part:“C51HD”,          supplier:“PARTS4”, category:“hardparts”, price:null },
{ id:“68_low_sprag”, name:“Low Sprag HD”,                    part:“R72644C”,        supplier:“PARTS4”, category:“hardparts”, price:null },
]
},
“6L80E”: {
label: “6L80E”, make: “GM”,
categories: {
overhaul:   { label:“Overhaul / Kits”,      color:”#ff6b35” },
friction:   { label:“Friction & Clutch”,    color:”#f0c040” },
electrical: { label:“Electrical / TECHM”,   color:”#4fc3f7” },
pump:       { label:“Pump Assembly”,        color:”#81c784” },
hardparts:  { label:“Hard Parts”,           color:”#ff8a65” },
filter:     { label:“Filter”,               color:”#80cbc4” },
},
parts: [
{ id:“6l_overhaul”,   name:“Overhaul Kit”,                    part:“104002A”,       supplier:“KING”,            category:“overhaul”,  price:null },
{ id:“6l_friction”,   name:“Friction Module”,                 part:“104119A”,       supplier:“KING”,            category:“friction”,  price:null },
{ id:“6l_steel”,      name:“Steel Module”,                    part:“T104139A”,      supplier:“KING”,            category:“friction”,  price:null },
{ id:“6l_bushing”,    name:“Bushing Kit”,                     part:“DB104030A”,     supplier:“KING”,            category:“overhaul”,  price:null },
{ id:“6l_surecure”,   name:“Surecure Kit”,                    part:“S104174A”,      supplier:“KING”,            category:“overhaul”,  price:null },
{ id:“6l_bellhousing”,name:“Bell Housing”,                    part:“R104750CB”,     supplier:“KING”,            category:“hardparts”, price:null },
{ id:“6l_stator”,     name:“Machine Stator”,                  part:”-”,             supplier:“Parkland Machine”,category:“hardparts”, price:150  },
{ id:“6l_piston”,     name:“Piston Kit”,                      part:“D104960K”,      supplier:“KING”,            category:“overhaul”,  price:null },
{ id:“6l_techm”,      name:“TECHM”,                           part:“CS104420C”,     supplier:“KING”,            category:“electrical”,price:null },
{ id:“6l_low_sprag”,  name:“Low Sprag”,                       part:“A104654”,       supplier:“KING”,            category:“hardparts”, price:null },
{ id:“6l_converter”,  name:“Converter”,                       part:“BU60HD”,        supplier:“PARTS4”,          category:“hardparts”, price:null },
{ id:“6l_drum”,       name:“3-5-R Drum”,                      part:“A104554A”,      supplier:“KING”,            category:“hardparts”, price:null },
{ id:“6l_pp456”,      name:“4-5-6 Pressure Plate”,            part:“104140A-01”,    supplier:“KING”,            category:“friction”,  price:null },
{ id:“6l_snaprings”,  name:“3-Snap Rings”,                    part:“24233406/24240199”,supplier:“KING”,         category:“hardparts”, price:null },
{ id:“6l_pump_rotor”, name:“Pump Rotor/Slide Kit”,            part:“D104531AX”,     supplier:“KING”,            category:“pump”,      price:null },
{ id:“6l_filter”,     name:“Filter”,                          part:“A104010A”,      supplier:“KING”,            category:“filter”,    price:null },
{ id:“6l_35r_piston”, name:“3-5-R Apply Piston (Alum)”,       part:“D104964A”,      supplier:“KING”,            category:“overhaul”,  price:null },
{ id:“6l_hd456”,      name:“HD 4-5-6 Apply Plate Kit”,        part:“104960-01K”,    supplier:“KING”,            category:“friction”,  price:null },
{ id:“6l_pump_wash”,  name:“OS Pump Washer”,                  part:“33452A”,        supplier:“KING”,            category:“pump”,      price:null },
{ id:“6l_clutch_spr”, name:“Clutch Select Valve Spring Kit”,  part:“104740-02K”,    supplier:“KING”,            category:“electrical”,price:null },
{ id:“6l_steel6l90”,  name:“STEEL 6L90 4-5-6”,               part:“104120”,        supplier:“KING”,            category:“friction”,  price:null },
]
},
“10R80”: {
label: “10R80”, make: “Ford”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
electrical:{ label:“Valve Body / Elec”, color:”#4fc3f7” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“10r_master”,    name:“Master Kit”,                      part:“MTK132983”,     supplier:“Cam Clarke”,category:“overhaul”,  price:null },
{ id:“10r_vb”,        name:“Valve Body”,                      part:“JL3Z7A100C”,    supplier:“Cam Clarke”,category:“electrical”,price:null },
{ id:“10r_bushing”,   name:“Bushing Kit”,                     part:“105030”,        supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“10r_input”,     name:“Input Shaft”,                     part:“HL3Z7015C”,     supplier:“Cam Clarke”,category:“hardparts”, price:null },
{ id:“10r_cdf_drum”,  name:“CDF Drum”,                        part:“JL3Z7H351B”,    supplier:“Cam Clarke”,category:“hardparts”, price:null },
{ id:“10r_sun_gear”,  name:”#3 Sun Gear Shaft (C Clutch Hub)”,part:”-”,             supplier:”-”,         category:“hardparts”, price:null },
{ id:“10r_filter”,    name:“Filter”,                          part:“A105010A”,      supplier:“KING”,      category:“filter”,    price:null },
{ id:“10r_ss_filter”, name:“Stop Start Filter”,               part:“1050014”,       supplier:“KING”,      category:“filter”,    price:null },
{ id:“10r_converter”, name:“Converter”,                       part:“FM140A”,        supplier:“PARTS”,     category:“hardparts”, price:null },
{ id:“10r_f_steels”,  name:“F-Clutch Steels”,                 part:“D105126A”,      supplier:“KING”,      category:“friction”,  price:null },
{ id:“10r_press_pl”,  name:“Pressure Plate”,                  part:”-”,             supplier:”-”,         category:“friction”,  price:null },
{ id:“10r_anod_cyl”,  name:“Anodized Cylinder”,               part:“PC3Z7B177A”,    supplier:“Cam Clarke”,category:“hardparts”, price:null },
{ id:“10r_frict_mod”, name:“10R80 Upgraded Friction Module”,  part:“105119AB”,      supplier:“Cam Clarke”,category:“friction”,  price:null },
{ id:“10r_f_bal_pis”, name:“F Clutch Balance Piston”,         part:“HL3Z7H360F”,    supplier:“Cam Clarke”,category:“hardparts”, price:null },
]
},
“6R140”: {
label: “6R140”, make: “Ford”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
friction:  { label:“Friction & Clutch”, color:”#f0c040” },
electrical:{ label:“Valve Body / Elec”, color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“6r_mast_d”,    name:“Master Kit No Steels/Pistons Diesel”,part:“126004BD”,    supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6r_mast_g”,    name:“Master Kit No Steels/Pistons Gas”,   part:“126004BG”,    supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6r_banner”,    name:“HD Banner Kit”,                       part:”-”,           supplier:”-”,         category:“overhaul”,  price:null },
{ id:“6r_vb”,        name:“Valve Body”,                          part:“HC3Z7A100B”,  supplier:“Cam Clarke”,category:“electrical”,price:null },
{ id:“6r_bushing”,   name:“Bushing Kit”,                         part:“236030”,      supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6r_pump_bear”, name:“Pump Bearing”,                        part:“S126209”,     supplier:“KING”,      category:“pump”,      price:null },
{ id:“6r_inp_drum”,  name:“Input Drum/Shaft”,                    part:“BC3Z-7F207-C”,supplier:“Cam Clarke”,category:“hardparts”, price:null },
{ id:“6r_converter”, name:“Converter”,                           part:“FM46”,        supplier:“PARTS4”,    category:“hardparts”, price:null },
{ id:“6r_cent_supp”, name:“Center Support Kit (Ford)”,           part:”-”,           supplier:”-”,         category:“hardparts”, price:null },
{ id:“6r_pump”,      name:“Pump Without PTO”,                    part:“D126500”,     supplier:“KING”,      category:“pump”,      price:null },
{ id:“6r_dir_pis”,   name:“Direct Piston Aluminum (Ford)”,       part:“BC3Z7A262B”,  supplier:“Cam Clarke”,category:“friction”,  price:null },
{ id:“6r_misc_pp”,   name:“Misc Pressure Plates”,                part:”-”,           supplier:”-”,         category:“friction”,  price:null },
{ id:“6r_steel_d”,   name:“Steel Module Diesel”,                 part:“126139B”,     supplier:“KING”,      category:“friction”,  price:null },
{ id:“6r_steel_g”,   name:“Steel Module Gas”,                    part:“126139A”,     supplier:“KING”,      category:“friction”,  price:null },
{ id:“6r_snap”,      name:“Snap Rings”,                          part:”-”,           supplier:”-”,         category:“hardparts”, price:null },
{ id:“6r_filter”,    name:“Filter”,                              part:“A126010”,     supplier:“KING”,      category:“filter”,    price:null },
{ id:“6r_od_piston”, name:“Overdrive Piston (Moulded)”,          part:“126960”,      supplier:“KING”,      category:“friction”,  price:null },
{ id:“6r_harness”,   name:“Harness”,                             part:”-”,           supplier:”-”,         category:“electrical”,price:null },
{ id:“6r_od_steels”, name:“Overdrive Steels”,                    part:“126120”,      supplier:“KING”,      category:“friction”,  price:null },
{ id:“6r_oil_seal”,  name:“Oil Filter Housing Seal to Block”,    part:“BC3Z6840A”,   supplier:“Cam Clarke”,category:“overhaul”,  price:null },
]
},
“6F35”: {
label: “6F35”, make: “Ford”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
friction:  { label:“Friction & Clutch”, color:”#f0c040” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“6f_seal”,      name:“Seal Kit (Ford w/ Pistons)”,          part:“MTK132959”,   supplier:“CC Ford”,   category:“overhaul”,  price:null },
{ id:“6f_friction”,  name:“Friction Module”,                     part:“J144119A”,    supplier:“KING”,      category:“friction”,  price:null },
{ id:“6f_steel”,     name:“Steel Module”,                        part:“144139A”,     supplier:“KING”,      category:“friction”,  price:null },
{ id:“6f_vb”,        name:“Valve Body”,                          part:“CV6Z-7A100-B”,supplier:“CC Ford”,   category:“electrical”,price:null },
{ id:“6f_sol_block”, name:“Solenoid Block”,                      part:“CV6Z-7G391-A”,supplier:“CC Ford”,   category:“electrical”,price:null },
{ id:“6f_diff_shim”, name:“Differential/Shim Kit”,              part:“S144761-5K”,  supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6f_converter”, name:“Torque Converter”,                    part:“A-FM112”,     supplier:“PARTS”,     category:“hardparts”, price:null },
{ id:“6f_chain”,     name:“Chain”,                               part:“9L8Z-7G249-C”,supplier:“CC Ford”,   category:“hardparts”, price:null },
{ id:“6f_drum456”,   name:“4-5-6 Drum”,                         part:“D144550B”,    supplier:“KING”,      category:“hardparts”, price:null },
{ id:“6f_bushing”,   name:“Bushing Kit”,                         part:“144030X”,     supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6f_axle_e”,    name:“K099 Axle Bushing Kit (Early)”,       part:“144064CT”,    supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6f_axle_l”,    name:“K0199 Axle Bushing Kit (Late)”,       part:“144064T”,     supplier:“KING”,      category:“overhaul”,  price:null },
{ id:“6f_bville_lr”, name:“Low Reverse Belleville Spring”,       part:“D144977BA”,   supplier:“KING”,      category:“hardparts”, price:null },
{ id:“6f_bville_fw”, name:“Forward Belleville Spring”,           part:“D144974BA”,   supplier:“KING”,      category:“hardparts”, price:null },
{ id:“6f_low_diode”, name:“Low Diode”,                           part:“D144644B”,    supplier:“KING”,      category:“hardparts”, price:null },
]
},
“4L80E”: {
label: “4L80E”, make: “GM”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
friction:  { label:“Friction & Clutch”, color:”#f0c040” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“4l80_banner”,   name:“Banner Kit”,                        part:“34004EAF”,     supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_surecure”, name:“Sure Cure Kit”,                     part:“S34174”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_bushing”,  name:“Bushing Kit”,                       part:“34030EA”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_int_sprag”,name:“Intermediate Sprag HD”,             part:“A34652A”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_snap”,     name:“Snap Ring 22878C”,                  part:“22878C”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_lr_band”,  name:“Low Reverse Band”,                  part:“B34024E”,      supplier:“KING”,   category:“friction”,  price:null },
{ id:“4l80_dir_drum”, name:“Direct Drum”,                       part:“B34022E”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_piston”,   name:“Piston Kit”,                        part:“T34960AK”,     supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_converter”,name:“Torque Converter”,                  part:“BU54”,         supplier:“PARTS”,  category:“hardparts”, price:null },
{ id:“4l80_steel”,    name:“Steel Module”,                      part:“T34139EA”,     supplier:“KING”,   category:“friction”,  price:null },
{ id:“4l80_od_e”,     name:“Overdrive Drum Kit (Early)”,        part:“A34551A”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_od_l”,     name:“Overdrive Drum Kit (Late)”,         part:“A34551”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_fwd_drum”, name:“Forward Drum”,                      part:“A34554EA”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_torr_brg”, name:“Torrington Bearing Kit”,            part:“34201A”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_washer”,   name:“Washer Kit”,                        part:“34200E”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_pump_grs”, name:“Pump Gears”,                        part:“A34530A”,      supplier:“KING”,   category:“pump”,      price:null },
{ id:“4l80_pump”,     name:“Pump”,                              part:“A34510EA”,     supplier:“KING”,   category:“pump”,      price:null },
{ id:“4l80_filter”,   name:“Filter”,                            part:“34010EA”,      supplier:“KING”,   category:“filter”,    price:null },
{ id:“4l80_pcs_e”,    name:“Pressure Control Solenoid (Early)”, part:“34435A”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l80_pcs_l”,    name:“Pressure Control Solenoid (Late)”,  part:“34435C”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l80_pwm_lu”,   name:“Lockup PWM Solenoid”,               part:“34418”,        supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l80_shift_sol”,name:“2-Shift Solenoid”,                  part:“34421”,        supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l80_wash_078”, name:“Washer (34301-078)”,                 part:“S34235-078”,   supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_wash_094”, name:“Washer (34301-094)”,                 part:“S34235-094”,   supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l80_psm”,      name:“Pressure Switch Manifold”,          part:“A34442”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l80_misc_pp”,  name:“Pressure Plate (Misc)”,             part:“D34144B”,      supplier:“KING”,   category:“friction”,  price:null },
{ id:“4l80_plan_f”,   name:“Planetary (Front)”,                 part:“U34584AB”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l80_plan_r”,   name:“Planetary (Rear)”,                  part:“U34584EA”,     supplier:“KING”,   category:“hardparts”, price:null },
]
},
“48RE”: {
label: “48RE”, make: “Dodge/Ram”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
friction:  { label:“Friction & Bands”,  color:”#f0c040” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“48_banner”,    name:“Banner Kit”,                         part:“22002HW”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_surecure”,  name:“Sure Cure Kit”,                      part:“S22174A”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_bushing”,   name:“Bushing Kit”,                        part:“22030EC”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_front_band”,name:“Front Band”,                         part:“B22022A”,      supplier:“KING”,   category:“friction”,  price:null },
{ id:“48_rear_band”, name:“Rear Band (Double Wrap)”,            part:“N22024C”,      supplier:“KING”,   category:“friction”,  price:null },
{ id:“48_servo_pin”, name:“Rear Servo Pin Kit”,                 part:“A12913”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_od_shim”,   name:“Overdrive Shim Kit”,                 part:“S12213K”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_lb_drum”,   name:“Low Band Drum”,                      part:“A225554G”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_od_pis_sup”,name:“Overdrive Piston Support”,           part:“A22634B”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_dir_drum”,  name:“Direct Drum”,                        part:“U22555B”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_od_planet”, name:“Overdrive Planetary”,                part:“A12580BB”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_od_sun”,    name:“Overdrive Sun Gear”,                 part:“A12610AB”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_od_brg”,    name:“Overdrive Bearing Kit”,              part:“22201A”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_filter”,    name:“Filter”,                             part:“A12010J”,      supplier:“KING”,   category:“filter”,    price:null },
{ id:“48_gov_sol”,   name:“Governor Solenoid”,                  part:“12432A”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“48_transducer”,name:“Transducer”,                         part:“T12432A”,      supplier:“KING”,   category:“electrical”,price:null },
{ id:“48_converter”, name:“Torque Converter”,                   part:“C50HD”,        supplier:“PARTS”,  category:“hardparts”, price:null },
{ id:“48_lu_od_sol”, name:“Lockup/Overdrive Solenoid”,          part:“12420C”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“48_inp_sun”,   name:“Input Sun Gear”,                     part:“A22612B”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_sunshell”,  name:“Sunshell”,                           part:”-”,            supplier:”-”,      category:“hardparts”, price:null },
{ id:“48_ext_shim”,  name:“Extension Housing Shim”,             part:“A22273”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_ext_hous”,  name:“Extension Housing”,                  part:“A22770GA”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_out_shim”,  name:“Output Shaft Shim”,                  part:“D12215C”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“48_pump”,      name:“Pump”,                               part:“R22500G”,      supplier:“KING”,   category:“pump”,      price:null },
{ id:“48_6_dir_fr”,  name:“6-Direct Frictions”,                 part:“22106B”,       supplier:“KING”,   category:“friction”,  price:null },
{ id:“48_band_arm”,  name:“4.2 Band Arm”,                       part:“146900”,       supplier:“TCS”,    category:“friction”,  price:null },
{ id:“48_low_roll”,  name:“Low Roller”,                         part:“22654A”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“48_press_pl”,  name:“Pressure Plate”,                     part:”-”,            supplier:”-”,      category:“friction”,  price:null },
{ id:“48_od_wave”,   name:“Overdrive Wave Snap Ring”,           part:“D12864”,       supplier:“KING”,   category:“overhaul”,  price:null },
]
},
“66RFE”: {
label: “66RFE”, make: “Dodge/Ram”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“66_banner”,    name:“Banner Kit”,                         part:“D72006D”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“66_surecure”,  name:“Surecure Kit”,                       part:“S72420ARK”,    supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“66_tcc”,       name:“TCC Switch Valve”,                   part:“44912-08K”,    supplier:“KING”,   category:“electrical”,price:null },
{ id:“66_bushing”,   name:“Bushing Kit”,                        part:“72030”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“66_converter”, name:“Torque Converter”,                   part:“C53M”,         supplier:“PARTS”,  category:“hardparts”, price:null },
{ id:“66_piston”,    name:“Piston Kit”,                         part:“72960CK”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“66_pan_flt”,   name:“Pan Filter”,                         part:“A72010BA”,     supplier:“KING”,   category:“filter”,    price:null },
{ id:“66_spin_flt”,  name:“Spin On Filter”,                     part:“72013A”,       supplier:“KING”,   category:“filter”,    price:null },
{ id:“66_transducer”,name:“Transducer”,                         part:“D72415”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“66_sol_body”,  name:“Solenoid Body”,                      part:“D72420A”,      supplier:“KING”,   category:“electrical”,price:null },
{ id:“66_pump_bg”,   name:“Pump Body and Gears”,                part:“R72500A”,      supplier:“KING”,   category:“pump”,      price:null },
{ id:“66_steel”,     name:“Steel Module”,                       part:“72139”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“66_od_rev”,    name:“OD-REV Pressure Plate Machined”,     part:“D72140A”,      supplier:“KING”,   category:“overhaul”,  price:30   },
{ id:“66_low_sprag”, name:“Low Sprag”,                          part:“A72654”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“66_misc_pp”,   name:“Misc Pressure Plates”,               part:”-”,            supplier:”-”,      category:“overhaul”,  price:null },
{ id:“66_od_snap”,   name:“OD Snap Ring (Tapered)”,             part:“D72860”,       supplier:“KING”,   category:“hardparts”, price:null },
]
},
“62TE”: {
label: “62TE”, make: “Dodge/Chrysler”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
valvebody: { label:“Valve Body”,        color:”#ce93d8” },
},
parts: [
{ id:“62_master”,    name:“Master Kit Mopar”,                   part:“D132004”,      supplier:”-”,      category:“overhaul”,  price:null },
{ id:“62_os_prv”,    name:“OS Pressure Regulator Valve”,        part:“92835-29”,     supplier:”-”,      category:“valvebody”, price:null },
{ id:“62_tcc_kit”,   name:“TCC Control/Plunger Kit”,            part:“92835-03K”,    supplier:”-”,      category:“valvebody”, price:null },
{ id:“62_os_sw_vv”,  name:“Oversized Switch Valve”,             part:“92835-32K”,    supplier:”-”,      category:“valvebody”, price:null },
{ id:“62_dir_drum”,  name:“Direct Drum”,                        part:“A132555”,      supplier:”-”,      category:“hardparts”, price:null },
{ id:“62_front_plan”,name:“Front Planetary 4-Pinion”,           part:“D162582”,      supplier:”-”,      category:“hardparts”, price:null },
{ id:“62_bushing”,   name:“Bushing Kit”,                        part:“DB132030”,     supplier:”-”,      category:“overhaul”,  price:null },
{ id:“62_torr_brg”,  name:“Torrington Bearing Kit”,             part:“92201A”,       supplier:”-”,      category:“overhaul”,  price:null },
{ id:“62_sol_body”,  name:“Solenoid Body”,                      part:“D132420”,      supplier:”-”,      category:“electrical”,price:null },
{ id:“62_lu_sol”,    name:“Lockup Solenoid”,                    part:“D132425”,      supplier:”-”,      category:“electrical”,price:null },
{ id:“62_transducer”,name:“Transducer”,                         part:“D132435”,      supplier:”-”,      category:“electrical”,price:null },
{ id:“62_converter”, name:“Torque Converter”,                   part:“OM26”,         supplier:“PARTS4”, category:“hardparts”, price:null },
{ id:“62_rear_sun”,  name:“Rear Sun Gear”,                      part:”-”,            supplier:”-”,      category:“hardparts”, price:null },
{ id:“62_inp_drum”,  name:“Input Drum”,                         part:“92574A”,       supplier:”-”,      category:“hardparts”, price:null },
{ id:“62_trf_brgs”,  name:“Transfer Gear Bearings”,             part:”-”,            supplier:”-”,      category:“hardparts”, price:null },
{ id:“62_spider_w”,  name:“2-Spider Gear Washers”,              part:“05078881AA”,   supplier:”-”,      category:“hardparts”, price:null },
{ id:“62_misc_wash”, name:“Misc Washers”,                       part:”-”,            supplier:”-”,      category:“overhaul”,  price:null },
{ id:“62_man_bush”,  name:“Manual Shaft Bushing”,               part:“262991-04K”,   supplier:”-”,      category:“overhaul”,  price:null },
{ id:“62_steel”,     name:“Steel Module”,                       part:”-”,            supplier:”-”,      category:“overhaul”,  price:null },
{ id:“62_sprag”,     name:“Sprag”,                              part:“A132642”,      supplier:”-”,      category:“hardparts”, price:null },
]
},
“545_65RFE”: {
label: “545/65RFE”, make: “Dodge/Chrysler”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“545_banner”,   name:“Banner Kit”,                         part:“72004”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“545_surecure”, name:“Surecure Kit”,                       part:“S72420ARK”,    supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“545_tcc”,      name:“OS TCC Switch Valve”,                part:“44912-08K”,    supplier:“KING”,   category:“electrical”,price:null },
{ id:“545_bushing”,  name:“Bushing Kit”,                        part:“72030”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“545_converter”,name:“Torque Converter”,                   part:“C27LS”,        supplier:“PARTS”,  category:“hardparts”, price:null },
{ id:“545_piston”,   name:“Piston Kit”,                         part:“72960BK”,      supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“545_pan_flt”,  name:“Pan Filter”,                         part:“A72010BA”,     supplier:“KING”,   category:“filter”,    price:null },
{ id:“545_spin_flt”, name:“Spin On Filter”,                     part:“72013A”,       supplier:“KING”,   category:“filter”,    price:null },
{ id:“545_transducer”,name:“Transducer”,                        part:“D72415”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“545_sol_body”, name:“Solenoid Body”,                      part:“D72420A”,      supplier:“KING”,   category:“electrical”,price:null },
{ id:“545_pump_bg”,  name:“Pump Body and Gears”,                part:“R72500A”,      supplier:“KING”,   category:“pump”,      price:null },
{ id:“545_steel”,    name:“Steel Module”,                       part:“72139”,        supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“545_od_rev”,   name:“OD-REV Pressure Plate Machined”,     part:“D72140A”,      supplier:“KING”,   category:“overhaul”,  price:30   },
{ id:“545_od_snap”,  name:“OD Snap Ring (Tapered)”,             part:“D72860”,       supplier:“KING”,   category:“hardparts”, price:null },
]
},
“4L60E”: {
label: “4L60E”, make: “GM”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
friction:  { label:“Friction & Clutch”, color:”#f0c040” },
electrical:{ label:“Electrical”,        color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
filter:    { label:“Filter”,            color:”#80cbc4” },
},
parts: [
{ id:“4l60_banner”,   name:“Banner Kit”,                        part:“74008EDF”,     supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l60_surecure”, name:“Sure Cure Kit”,                     part:“S741774A”,     supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l60_spd_sens”, name:“Input Speed Sensor”,                part:“A492436”,      supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l60_24_band”,  name:“2-4 Band”,                          part:“B74020AH”,     supplier:“KING”,   category:“friction”,  price:null },
{ id:“4l60_rear_plan”,name:“Rear Planetary Kit”,                part:“U74584BK”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_rear_sun”, name:“Rear Sun Gear”,                     part:“A74614”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_sun_shell”,name:“Sun Shell”,                         part:“S74624SS”,     supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_pcs_e”,    name:“Pressure Control Solenoid”,         part:“34435A”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l60_pwm_lu”,   name:“PWM LU Solenoid”,                   part:“74418E”,       supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l60_pwm_32”,   name:“PWM 3-2 Solenoid”,                  part:“74418EA”,      supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l60_shift_sol”,name:“2-Shift Solenoid”,                  part:“34421”,        supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l60_filter”,   name:“Filter”,                            part:“A74010ECP”,    supplier:“KING”,   category:“filter”,    price:null },
{ id:“4l60_converter”,name:“Torque Converter”,                  part:“BU54”,         supplier:“PARTS”,  category:“hardparts”, price:null },
{ id:“4l60_bushing”,  name:“Bushing Kit”,                       part:“74030E”,       supplier:“KING”,   category:“overhaul”,  price:null },
{ id:“4l60_sprag”,    name:“Sprag”,                             part:“A74658B”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_low_roll”, name:“Low Roller”,                        part:“74654A”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_rev_drum”, name:“Reverse Input Drum”,                part:“A74556B”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_psm”,      name:“Pressure Switch Manifold”,          part:“74442”,        supplier:“KING”,   category:“electrical”,price:null },
{ id:“4l60_front_sun”,name:“Front Sun Gear”,                    part:“A74612A”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_sprag_r”,  name:“Sprag Races”,                       part:”-”,            supplier:”-”,      category:“hardparts”, price:null },
{ id:“4l60_steel”,    name:“Steel Module”,                      part:“74139B”,       supplier:“KING”,   category:“friction”,  price:null },
{ id:“4l60_34_spr”,   name:“3-4 Load Springs”,                  part:“D73970”,       supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_34_plug”,  name:“3-4 Relay O-Ring End Plug”,         part:“S74741EC-6”,   supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_plan_4”,   name:“Front Planetary (4-pin)”,           part:“U74582A”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_plan_5”,   name:“Front Planetary (5-pin)”,           part:“A74582D”,      supplier:“KING”,   category:“hardparts”, price:null },
{ id:“4l60_pump_ws”,  name:“Pump (w/ Speed Sensor Hole)”,       part:“R74500J”,      supplier:“KING”,   category:“pump”,      price:null },
{ id:“4l60_pump_wo”,  name:“Pump (w/o Speed Sensor Hole)”,      part:“R74500HA”,     supplier:“KING”,   category:“pump”,      price:null },
{ id:“4l60_hd_34”,    name:“HD 3-4 Clutch Kit”,                 part:“R74119EHP”,    supplier:“KING”,   category:“friction”,  price:null },
]
},
“CVT”: {
label: “CVT”, make: “Various”,
categories: {
overhaul:  { label:“Overhaul / Kits”,   color:”#ff6b35” },
electrical:{ label:“Valve Body”,        color:”#4fc3f7” },
pump:      { label:“Pump Assembly”,     color:”#81c784” },
filter:    { label:“Filter”,            color:”#80cbc4” },
hardparts: { label:“Hard Parts”,        color:”#ff8a65” },
},
parts: [
{ id:“cvt_seal”,     name:“Seal Kit”,                           part:””,             supplier:””,       category:“overhaul”,  price:null },
{ id:“cvt_friction”, name:“Friction Module”,                    part:””,             supplier:””,       category:“overhaul”,  price:null },
{ id:“cvt_steel”,    name:“Steel Module”,                       part:””,             supplier:””,       category:“overhaul”,  price:null },
{ id:“cvt_flow”,     name:“Flow Valve”,                         part:””,             supplier:””,       category:“electrical”,price:null },
{ id:“cvt_sump_flt”, name:“Sump Filter”,                        part:””,             supplier:””,       category:“filter”,    price:null },
{ id:“cvt_cart_flt”, name:“Cartridge Filter”,                   part:””,             supplier:””,       category:“filter”,    price:null },
{ id:“cvt_rear_cov”, name:“Rear Cover & Pulley Kit”,            part:””,             supplier:””,       category:“hardparts”, price:null },
{ id:“cvt_vb”,       name:“Valve Body”,                         part:””,             supplier:””,       category:“electrical”,price:null },
{ id:“cvt_pump”,     name:“Pump”,                               part:””,             supplier:””,       category:“pump”,      price:null },
{ id:“cvt_bushing”,  name:“Bushing Kit”,                        part:””,             supplier:””,       category:“overhaul”,  price:null },
]
},
};

// — ADDITIONAL SERVICES ——————————————————
const OTHER_SERVICES = {
“TRANSFER_CASE”: {
label: “Transfer Case”, make: “Various”, icon: “TC”,
categories: {
seals:     { label:“Bearing & Seal Kit”,  color:”#f0c040” },
chain:     { label:“Chain & Sprockets”,   color:”#ff6b35” },
hardparts: { label:“Hard Parts”,          color:”#ff8a65” },
other:     { label:“Other”,               color:”#80cbc4” },
},
parts: [
// Bearing & Seal Kit
{ id:“tc_seal_kit”,    name:“Bearing & Seal Kit (Complete)”,    part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_front_seal”,  name:“Front Input Seal”,                 part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_rear_seal”,   name:“Rear Output Seal”,                 part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_side_seal”,   name:“Side Yoke Seal”,                   part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_front_brg”,   name:“Front Input Bearing”,              part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_rear_brg”,    name:“Rear Output Bearing”,              part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_pump_brg”,    name:“Pump Bearing”,                     part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_gasket_set”,  name:“Gasket Set”,                       part:”-”, supplier:”-”, category:“seals”,     price:null },
{ id:“tc_oring_kit”,   name:“O-Ring Kit”,                       part:”-”, supplier:”-”, category:“seals”,     price:null },
// Chain & Sprockets
{ id:“tc_chain”,       name:“Transfer Case Chain”,              part:”-”, supplier:”-”, category:“chain”,     price:null },
{ id:“tc_drive_spkt”,  name:“Drive Sprocket”,                   part:”-”, supplier:”-”, category:“chain”,     price:null },
{ id:“tc_driven_spkt”, name:“Driven Sprocket”,                  part:”-”, supplier:”-”, category:“chain”,     price:null },
{ id:“tc_spkt_kit”,    name:“Sprocket & Chain Kit”,             part:”-”, supplier:”-”, category:“chain”,     price:null },
// Hard Parts
{ id:“tc_case_half_f”, name:“Front Case Half”,                  part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_case_half_r”, name:“Rear Case Half”,                   part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_mode_fork”,   name:“Mode Fork”,                        part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_range_fork”,  name:“Range Fork”,                       part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_shift_rail”,  name:“Shift Rail”,                       part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_annulus”,     name:“Annulus Gear”,                     part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_planet_assy”, name:“Planetary Assembly”,               part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_sun_gear”,    name:“Sun Gear”,                         part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_input_shaft”, name:“Input Shaft”,                      part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_output_f”,    name:“Front Output Shaft”,               part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_output_r”,    name:“Rear Output Shaft”,                part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“tc_magnet”,      name:“Drain Plug with Magnet”,           part:”-”, supplier:”-”, category:“hardparts”, price:null },
// Other
{ id:“tc_fluid”,       name:“Transfer Case Fluid”,              part:”-”, supplier:”-”, category:“other”,     price:null },
{ id:“tc_encoder_mtr”, name:“Encoder Motor”,                    part:”-”, supplier:”-”, category:“other”,     price:null },
{ id:“tc_actuator”,    name:“Shift Actuator”,                   part:”-”, supplier:”-”, category:“other”,     price:null },
{ id:“tc_speed_sens”,  name:“Speed Sensor”,                     part:”-”, supplier:”-”, category:“other”,     price:null },
{ id:“tc_vent”,        name:“Vent Assembly”,                     part:”-”, supplier:”-”, category:“other”,     price:null },
]
},

“DIFFERENTIAL”: {
label: “Differential”, make: “Various”, icon: “🔧”,
categories: {
seals:    { label:“Bearing & Seal Kit”, color:”#f0c040” },
gears:    { label:“Crown & Pinion”,     color:”#ff6b35” },
carrier:  { label:“Carrier Assembly”,   color:”#ce93d8” },
axle:     { label:“Axle & Bearings”,    color:”#4fc3f7” },
spider:   { label:“Spider Gears”,       color:”#81c784” },
},
parts: [
// Bearing & Seal Kit
{ id:“df_brg_seal”,    name:“Master Bearing & Seal Kit”,        part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_pinion_seal”, name:“Pinion Seal”,                      part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_axle_seal_l”, name:“Axle Seal (Left)”,                 part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_axle_seal_r”, name:“Axle Seal (Right)”,                part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_pinion_brg_f”,name:“Pinion Bearing (Front)”,           part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_pinion_brg_r”,name:“Pinion Bearing (Rear)”,            part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_carrier_brg”, name:“Carrier Bearings (Pair)”,          part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_shim_kit”,    name:“Shim Kit”,                         part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_crush_sleeve”,name:“Crush Sleeve”,                     part:”-”, supplier:”-”, category:“seals”,   price:null },
{ id:“df_gasket”,      name:“Differential Cover Gasket”,        part:”-”, supplier:”-”, category:“seals”,   price:null },
// Crown & Pinion
{ id:“df_ring_pinion”, name:“Ring & Pinion Set”,                part:”-”, supplier:”-”, category:“gears”,   price:null },
{ id:“df_ring_gear”,   name:“Ring Gear Only”,                   part:”-”, supplier:”-”, category:“gears”,   price:null },
{ id:“df_pinion_gear”, name:“Pinion Gear Only”,                 part:”-”, supplier:”-”, category:“gears”,   price:null },
{ id:“df_pinion_nut”,  name:“Pinion Nut”,                       part:”-”, supplier:”-”, category:“gears”,   price:null },
{ id:“df_yoke”,        name:“Pinion Yoke / Flange”,             part:”-”, supplier:”-”, category:“gears”,   price:null },
// Carrier
{ id:“df_carrier”,     name:“Carrier Assembly”,                 part:”-”, supplier:”-”, category:“carrier”, price:null },
{ id:“df_locker”,      name:“Locking Differential”,             part:”-”, supplier:”-”, category:“carrier”, price:null },
{ id:“df_lsd”,         name:“Limited Slip Unit”,                part:”-”, supplier:”-”, category:“carrier”, price:null },
{ id:“df_clutch_pack”, name:“LSD Clutch Pack”,                  part:”-”, supplier:”-”, category:“carrier”, price:null },
{ id:“df_side_gear”,   name:“Side Gears (Pair)”,                part:”-”, supplier:”-”, category:“carrier”, price:null },
{ id:“df_thrust_wash”, name:“Thrust Washers”,                   part:”-”, supplier:”-”, category:“carrier”, price:null },
// Axle & Bearings
{ id:“df_axle_l”,      name:“Axle Shaft (Left)”,                part:”-”, supplier:”-”, category:“axle”,    price:null },
{ id:“df_axle_r”,      name:“Axle Shaft (Right)”,               part:”-”, supplier:”-”, category:“axle”,    price:null },
{ id:“df_axle_brg_l”,  name:“Axle Bearing (Left)”,              part:”-”, supplier:”-”, category:“axle”,    price:null },
{ id:“df_axle_brg_r”,  name:“Axle Bearing (Right)”,             part:”-”, supplier:”-”, category:“axle”,    price:null },
{ id:“df_axle_retainer”,name:“Axle Bearing Retainer”,           part:”-”, supplier:”-”, category:“axle”,    price:null },
{ id:“df_cv_joint”,    name:“CV Joint / Half Shaft”,            part:”-”, supplier:”-”, category:“axle”,    price:null },
// Spider Gears
{ id:“df_spider_kit”,  name:“Spider Gear Kit (Complete)”,       part:”-”, supplier:”-”, category:“spider”,  price:null },
{ id:“df_spider_gear”, name:“Spider Gears (Set of 4)”,          part:”-”, supplier:”-”, category:“spider”,  price:null },
{ id:“df_spider_pin”,  name:“Spider Gear Pin / Cross Shaft”,    part:”-”, supplier:”-”, category:“spider”,  price:null },
{ id:“df_roll_pin”,    name:“Roll Pin / Lock Pin”,               part:”-”, supplier:”-”, category:“spider”,  price:null },
]
},

“GENERIC_AUTO”: {
label: “Generic Auto Trans”, make: “Various”, icon: “🔩”,
categories: {
overhaul:   { label:“Overhaul / Kits”,      color:”#ff6b35” },
friction:   { label:“Friction & Steels”,    color:”#f0c040” },
electrical: { label:“Electrical / Solenoids”,color:”#4fc3f7” },
pump:       { label:“Pump Assembly”,        color:”#81c784” },
hardparts:  { label:“Hard Parts”,           color:”#ff8a65” },
filter:     { label:“Filter & Pan”,         color:”#80cbc4” },
},
parts: [
// Overhaul
{ id:“ga_master_kit”,  name:“Master Rebuild Kit”,               part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_banner_kit”,  name:“Banner / Overhaul Kit”,            part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_seal_kit”,    name:“Seal Kit”,                         part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_bushing_kit”, name:“Bushing Kit”,                      part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_piston_kit”,  name:“Piston Kit”,                       part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_ring_kit”,    name:“Snap Ring Kit”,                    part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_washer_kit”,  name:“Thrust Washer Kit”,                part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_bearing_kit”, name:“Torrington Bearing Kit”,           part:”-”, supplier:”-”, category:“overhaul”,   price:null },
{ id:“ga_surecure”,    name:“Surecure / Additive Kit”,          part:”-”, supplier:”-”, category:“overhaul”,   price:null },
// Friction & Steels
{ id:“ga_friction_mod”,name:“Friction Module”,                  part:”-”, supplier:”-”, category:“friction”,   price:null },
{ id:“ga_steel_mod”,   name:“Steel Module”,                     part:”-”, supplier:”-”, category:“friction”,   price:null },
{ id:“ga_band”,        name:“Band (Adjustable)”,                part:”-”, supplier:”-”, category:“friction”,   price:null },
{ id:“ga_band_servo”,  name:“Band Servo Kit”,                   part:”-”, supplier:”-”, category:“friction”,   price:null },
{ id:“ga_clutch_drum”, name:“Clutch Drum”,                      part:”-”, supplier:”-”, category:“friction”,   price:null },
{ id:“ga_press_plate”, name:“Pressure Plate”,                   part:”-”, supplier:”-”, category:“friction”,   price:null },
// Electrical
{ id:“ga_sol_kit”,     name:“Solenoid Kit (Full Set)”,          part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_sol_body”,    name:“Solenoid Body / Block”,            part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_tcc_sol”,     name:“TCC Solenoid”,                     part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_shift_sol”,   name:“Shift Solenoid”,                   part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_pcs”,         name:“Pressure Control Solenoid”,        part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_harness”,     name:“Internal Wiring Harness”,          part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_transducer”,  name:“Transducer / Pressure Switch”,     part:”-”, supplier:”-”, category:“electrical”, price:null },
{ id:“ga_speed_sens”,  name:“Input / Output Speed Sensor”,      part:”-”, supplier:”-”, category:“electrical”, price:null },
// Pump
{ id:“ga_pump_assy”,   name:“Pump Assembly (Complete)”,         part:”-”, supplier:”-”, category:“pump”,       price:null },
{ id:“ga_pump_gears”,  name:“Pump Gear Set”,                    part:”-”, supplier:”-”, category:“pump”,       price:null },
{ id:“ga_pump_seal”,   name:“Pump Seal”,                        part:”-”, supplier:”-”, category:“pump”,       price:null },
{ id:“ga_pump_bushing”,name:“Pump Bushing”,                     part:”-”, supplier:”-”, category:“pump”,       price:null },
// Hard Parts
{ id:“ga_tc”,          name:“Torque Converter”,                 part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_valve_body”,  name:“Valve Body”,                       part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_sep_plate”,   name:“Separator Plate”,                  part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_planetary”,   name:“Planetary Assembly”,               part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_sun_shell”,   name:“Sun Shell”,                        part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_sprag”,       name:“Sprag / One Way Clutch”,           part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_output_shaft”,name:“Output Shaft”,                     part:”-”, supplier:”-”, category:“hardparts”,  price:null },
{ id:“ga_input_shaft”, name:“Input Shaft”,                      part:”-”, supplier:”-”, category:“hardparts”,  price:null },
// Filter & Pan
{ id:“ga_filter”,      name:“Filter”,                           part:”-”, supplier:”-”, category:“filter”,     price:null },
{ id:“ga_pan_gasket”,  name:“Pan Gasket”,                       part:”-”, supplier:”-”, category:“filter”,     price:null },
{ id:“ga_pan”,         name:“Oil Pan”,                          part:”-”, supplier:”-”, category:“filter”,     price:null },
{ id:“ga_drain_plug”,  name:“Drain Plug / Magnet”,              part:”-”, supplier:”-”, category:“filter”,     price:null },
]
},

“MANUAL_TRANS”: {
label: “Manual Transmission”, make: “Various”, icon: “MT”,
categories: {
overhaul:  { label:“Overhaul / Seals”,    color:”#ff6b35” },
gears:     { label:“Gear Sets”,           color:”#f0c040” },
syncro:    { label:“Synchros & Rings”,    color:”#4fc3f7” },
shift:     { label:“Shift Components”,   color:”#ce93d8” },
hardparts: { label:“Hard Parts”,          color:”#ff8a65” },
clutch:    { label:“Clutch System”,       color:”#81c784” },
},
parts: [
// Overhaul / Seals
{ id:“mt_master_kit”,  name:“Master Rebuild Kit”,               part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_bearing_kit”, name:“Bearing Kit (Full Set)”,           part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_seal_kit”,    name:“Seal Kit”,                         part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_input_seal”,  name:“Input Shaft Seal”,                 part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_output_seal”, name:“Output Shaft Seal”,                part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_shift_seal”,  name:“Shift Shaft Seal”,                 part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_gasket_set”,  name:“Gasket Set”,                       part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_snap_rings”,  name:“Snap Ring Kit”,                    part:”-”, supplier:”-”, category:“overhaul”,  price:null },
{ id:“mt_shim_kit”,    name:“Shim / Spacer Kit”,                part:”-”, supplier:”-”, category:“overhaul”,  price:null },
// Gear Sets
{ id:“mt_1st_gear”,    name:“1st Gear”,                         part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_2nd_gear”,    name:“2nd Gear”,                         part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_3rd_gear”,    name:“3rd Gear”,                         part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_4th_gear”,    name:“4th Gear”,                         part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_5th_gear”,    name:“5th Gear”,                         part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_6th_gear”,    name:“6th Gear”,                         part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_reverse_gear”,name:“Reverse Gear / Idler”,             part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_countershaft”,name:“Countershaft / Cluster Gear”,      part:”-”, supplier:”-”, category:“gears”,     price:null },
{ id:“mt_mainshaft”,   name:“Mainshaft”,                        part:”-”, supplier:”-”, category:“gears”,     price:null },
// Synchros & Rings
{ id:“mt_syncro_kit”,  name:“Synchro Kit (Full Set)”,           part:”-”, supplier:”-”, category:“syncro”,    price:null },
{ id:“mt_syncro_12”,   name:“1st-2nd Synchro Assembly”,         part:”-”, supplier:”-”, category:“syncro”,    price:null },
{ id:“mt_syncro_34”,   name:“3rd-4th Synchro Assembly”,         part:”-”, supplier:”-”, category:“syncro”,    price:null },
{ id:“mt_syncro_56”,   name:“5th-6th Synchro Assembly”,         part:”-”, supplier:”-”, category:“syncro”,    price:null },
{ id:“mt_blocking_rng”,name:“Blocking Rings (Set)”,             part:”-”, supplier:”-”, category:“syncro”,    price:null },
{ id:“mt_sync_springs”,name:“Synchro Springs & Keys”,           part:”-”, supplier:”-”, category:“syncro”,    price:null },
// Shift Components
{ id:“mt_shift_fork_1”,name:“Shift Fork 1-2”,                   part:”-”, supplier:”-”, category:“shift”,     price:null },
{ id:“mt_shift_fork_2”,name:“Shift Fork 3-4”,                   part:”-”, supplier:”-”, category:“shift”,     price:null },
{ id:“mt_shift_fork_3”,name:“Shift Fork 5-6 / Rev”,             part:”-”, supplier:”-”, category:“shift”,     price:null },
{ id:“mt_shift_rail”,  name:“Shift Rails (Set)”,                part:”-”, supplier:”-”, category:“shift”,     price:null },
{ id:“mt_detent_kit”,  name:“Detent Ball & Spring Kit”,         part:”-”, supplier:”-”, category:“shift”,     price:null },
{ id:“mt_interlock”,   name:“Interlock Pins”,                   part:”-”, supplier:”-”, category:“shift”,     price:null },
{ id:“mt_shift_lever”, name:“Shift Lever / Tower”,              part:”-”, supplier:”-”, category:“shift”,     price:null },
// Hard Parts
{ id:“mt_input_shaft”, name:“Input Shaft”,                      part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_output_shaft”,name:“Output Shaft”,                     part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_case_front”,  name:“Front Case / Bell Housing”,        part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_case_rear”,   name:“Rear Extension Housing”,           part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_input_brg”,   name:“Input Shaft Bearing”,              part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_output_brg”,  name:“Output Shaft Bearing”,             part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_counter_brg”, name:“Countershaft Bearings (Set)”,      part:”-”, supplier:”-”, category:“hardparts”, price:null },
{ id:“mt_pilot_brg”,   name:“Pilot Bearing”,                    part:”-”, supplier:”-”, category:“hardparts”, price:null },
// Clutch System
{ id:“mt_clutch_kit”,  name:“Clutch Kit (Disc, Pressure, Bearing)”, part:”-”, supplier:”-”, category:“clutch”, price:null },
{ id:“mt_clutch_disc”, name:“Clutch Disc”,                      part:”-”, supplier:”-”, category:“clutch”,    price:null },
{ id:“mt_pressure_pl”, name:“Pressure Plate”,                   part:”-”, supplier:”-”, category:“clutch”,    price:null },
{ id:“mt_throw_brg”,   name:“Throw-Out / Release Bearing”,      part:”-”, supplier:”-”, category:“clutch”,    price:null },
{ id:“mt_flywheel”,    name:“Flywheel / Flexplate”,             part:”-”, supplier:”-”, category:“clutch”,    price:null },
{ id:“mt_slave_cyl”,   name:“Slave Cylinder”,                   part:”-”, supplier:”-”, category:“clutch”,    price:null },
{ id:“mt_master_cyl”,  name:“Master Cylinder”,                  part:”-”, supplier:”-”, category:“clutch”,    price:null },
{ id:“mt_clutch_line”, name:“Clutch Hydraulic Line”,            part:”-”, supplier:”-”, category:“clutch”,    price:null },
]
},
};

const MAKES = {
“Dodge/Ram”:     “#e8303a”,
“Ford”:          “#0066cc”,
“GM”:            “#f9a825”,
“Dodge/Chrysler”:”#9c27b0”,
“Various”:       “#607d8b”,
};

// Combined lookup - transmission or other service
const ALL_SERVICES = { …TRANSMISSIONS, …OTHER_SERVICES };
const SERVICE_TYPE_GROUPS = [
{ label:“Automatic Transmissions”, color:”#ff6b35”, keys: Object.keys(TRANSMISSIONS) },
{ label:“Transfer Case”,           color:”#f0c040”, keys: [“TRANSFER_CASE”] },
{ label:“Differential”,            color:”#4fc3f7”, keys: [“DIFFERENTIAL”] },
{ label:“Generic Auto Trans”,      color:”#81c784”, keys: [“GENERIC_AUTO”] },
{ label:“Manual Transmission”,     color:”#ce93d8”, keys: [“MANUAL_TRANS”] },
];

// — REMOVAL CHECKLIST —————————————————––
const REMOVAL_ITEMS = [
{ id:“ds_front”,    label:“Front Driveshaft”,           category:“driveline”, photo:false },
{ id:“ds_rear”,     label:“Rear Driveshaft”,            category:“driveline”, photo:false },
{ id:“tc_unit”,     label:“Transfer Case”,              category:“driveline”, photo:false },
{ id:“yoke_uj”,     label:“Yokes / U-Joints”,           category:“driveline”, photo:true  },
{ id:“tail_seal”,   label:“Tail Housing Seal”,          category:“seals”,     photo:true  },
{ id:“pump_seal”,   label:“Front Pump Seal”,            category:“seals”,     photo:true  },
{ id:“out_seal”,    label:“Output Shaft Seal”,          category:“seals”,     photo:true  },
{ id:“ext_seal”,    label:“Extension Housing Seal”,     category:“seals”,     photo:true  },
{ id:“tc_seal_f”,   label:“Transfer Case Front Seal”,   category:“seals”,     photo:true  },
{ id:“tc_seal_r”,   label:“Transfer Case Rear Seal”,    category:“seals”,     photo:true  },
{ id:“tc_seal_in”,  label:“Transfer Case Input Seal”,   category:“seals”,     photo:true  },
{ id:“trans_fluid”, label:“Trans Fluid Condition”,      category:“fluids”,    photo:true  },
{ id:“tc_fluid”,    label:“Transfer Case Fluid”,        category:“fluids”,    photo:true  },
{ id:“diff_front”,  label:“Front Differential Fluid”,   category:“fluids”,    photo:false },
{ id:“diff_rear”,   label:“Rear Differential Fluid”,    category:“fluids”,    photo:false },
{ id:“cool_contam”, label:“Cooler Line Contamination”,  category:“fluids”,    photo:true  },
{ id:“cool_lines”,  label:“Cooler Lines Condition”,     category:“cooling”,   photo:true  },
{ id:“cooler_unit”, label:“Transmission Cooler”,        category:“cooling”,   photo:true  },
{ id:“cool_fitt”,   label:“Cooler Fittings / Ferrules”, category:“cooling”,   photo:true  },
{ id:“aux_cooler”,  label:“Auxiliary Cooler”,           category:“cooling”,   photo:false },
{ id:“crossmember”, label:“Crossmember / Mount”,        category:“recommend”, photo:true  },
{ id:“wiring”,      label:“Wiring Harness Condition”,   category:“recommend”, photo:true  },
{ id:“flex_plate”,  label:“Flex Plate Inspection”,      category:“recommend”, photo:true  },
{ id:“throttle”,    label:“Throttle Body / Linkage”,    category:“recommend”, photo:false },
{ id:“skid_plate”,  label:“Skid Plate Condition”,       category:“recommend”, photo:false },
{ id:“exhaust_cl”,  label:“Exhaust Clearance”,          category:“recommend”, photo:false },
];

const REM_CATS = {
driveline:  { label:“Driveline”,          color:”#ff6b35” },
seals:      { label:“Seals”,              color:”#f0c040” },
fluids:     { label:“Fluids”,             color:”#4fc3f7” },
cooling:    { label:“Cooling System”,     color:”#81c784” },
recommend:  { label:“Recommendations”,   color:”#ce93d8” },
};

const STATUS_OPTS = [“Pass”,“Fail”,“Needs Attention”];
const STATUS_COLORS = { “Pass”:”#4caf50”,“Fail”:”#f44336”,“Needs Attention”:”#ff9800” };

const EMPTY_CUSTOM = () => ({ name:””, part:””, supplier:””, price:”” });

// — DEMO RO DATA ———————————————————––
const DEMO_ROS = {
“RO-1001”: { vehicle:“2020 Ram 2500 6.7L Cummins”,         year:“2020”, trans:“68RFE”    },
“RO-1002”: { vehicle:“2018 Chevrolet Silverado 1500 5.3L”, year:“2018”, trans:“6L80E”    },
“RO-1003”: { vehicle:“2021 Ford F-150 3.5L EcoBoost”,      year:“2021”, trans:“10R80”    },
“RO-1004”: { vehicle:“2019 Ford F-250 6.7L Diesel”,        year:“2019”, trans:“6R140”    },
“RO-1005”: { vehicle:“2017 Ram 1500 3.6L V6”,              year:“2017”, trans:“66RFE”    },
“RO-1006”: { vehicle:“2015 GM Sierra 2500 6.0L”,           year:“2015”, trans:“4L80E”       },
“RO-1007”: { vehicle:“2016 Ford Escape 1.5L”,              year:“2016”, trans:“6F35”        },
“RO-1008”: { vehicle:“2014 Dodge Charger 3.6L”,            year:“2014”, trans:“62TE”        },
“RO-1009”: { vehicle:“2018 Ram 2500 6.7L Cummins”,         year:“2018”, trans:“TRANSFER_CASE” },
“RO-1010”: { vehicle:“2019 Ford F-250 6.7L Diesel”,        year:“2019”, trans:“DIFFERENTIAL”  },
“RO-1011”: { vehicle:“2016 Jeep Wrangler 3.6L”,            year:“2016”, trans:“MANUAL_TRANS”  },
};

// — MAIN APP ––––––––––––––––––––––––––––––––
export default function TransmissionApp() {
const [screen, setScreen]         = useState(“ro”);    // ro | stage1 | stage2 | advisor | settings
const [roInfo, setRoInfo]         = useState({ ro:””, vehicle:””, year:””, trans:“68RFE” });
const [techInitials, setTechInitials] = useState(””);

// Shopmonkey integration
const [apiDebug, setApiDebug]     = useState(null); // raw API response for debugging
const [apiKey, setApiKey]         = useState(””);
const [relayUrl, setRelayUrl]     = useState(””);
const [demoMode, setDemoMode]     = useState(true);
const [roLookup, setRoLookup]     = useState(“idle”); // idle | loading | found | error
const [pushState, setPushState]   = useState(“idle”); // idle | loading | success | error
const [pushLog, setPushLog]       = useState([]);

// Service line targeting
const [serviceLines, setServiceLines]     = useState([]); // all lines on the RO
const [targetLineId, setTargetLineId]     = useState(null); // chosen service line id
const [showLinePicker, setShowLinePicker] = useState(false); // warn modal

// Demo service lines - simulates what Shopmonkey returns for an RO
const DEMO_SERVICE_LINES = [
{ id:“SL-001”, name:“Overhaul and Installation of Transmission”,  labor:1200 },
{ id:“SL-002”, name:“Transmission Flush and Fluid Service”,        labor:180  },
{ id:“SL-003”, name:“Diagnostic Fee”,                             labor:120  },
{ id:“SL-004”, name:“Road Test”,                                   labor:0    },
];

// Stage 1
const [s1Data, setS1Data]         = useState({});      // { [itemId]: { status, note, photo } }
const [s1Initials, setS1Initials] = useState(””);
const [s1Signed, setS1Signed]     = useState(false);
const [s1Custom, setS1Custom]     = useState([EMPTY_CUSTOM(), EMPTY_CUSTOM(), EMPTY_CUSTOM(), EMPTY_CUSTOM()]);

// Stage 2
const [s2Selected, setS2Selected] = useState({});      // { [partId]: bool }
const [s2Prices, setS2Prices]     = useState({});
const [s2Notes, setS2Notes]       = useState({});
const [s2Initials, setS2Initials] = useState(””);
const [s2Signed, setS2Signed]     = useState(false);
const [s2Custom, setS2Custom]     = useState([EMPTY_CUSTOM(), EMPTY_CUSTOM(), EMPTY_CUSTOM(), EMPTY_CUSTOM()]);
const [filterCat, setFilterCat]   = useState(“all”);

// Advisor
const [tps, setTps]               = useState({});
const [loadingTp, setLoadingTp]   = useState({});
const [openTp, setOpenTp]         = useState(null);

const photoRefs = useRef({});
const trans = ALL_SERVICES[roInfo.trans] || ALL_SERVICES[“68RFE”];

// – helpers –––––––––––––––––––––––––––––––
const setS1Item = (id, field, val) =>
setS1Data(p => ({ …p, [id]: { …p[id], [field]: val } }));

const togglePart = (id) => setS2Selected(p => ({ …p, [id]: !p[id] }));

const getPrice = (part) => {
if (s2Prices[part.id] !== undefined) return parseFloat(s2Prices[part.id]) || 0;
if (part.price !== null) return part.price;
return 0;
};

const selectedParts = trans.parts.filter(p => s2Selected[p.id]);
const customPartsTotal = s2Custom.reduce((s,c) => s + (parseFloat(c.price)||0), 0);

// – Shopmonkey helpers ––––––––––––––––––––––––––
const lookupRO = async () => {
if (!roInfo.ro) return;
setRoLookup(“loading”);
await new Promise(r => setTimeout(r, 900));
if (demoMode) {
const found = DEMO_ROS[roInfo.ro.toUpperCase().replace(/[\s]/g,””)];
if (found) {
setRoInfo(p => ({…p, vehicle:found.vehicle, year:found.year, trans:found.trans}));
setRoLookup(“found”);
} else { setRoLookup(“error”); }
} else {
try {
setApiDebug(null);
const base = relayUrl.replace(/[/]$/, “”);
const res = await fetch(”” + (base) + “/api/order/lookup?number=” + (encodeURIComponent(roInfo.ro)) + “”);
const data = await res.json();
setApiDebug(data);
if (data.found) {
setRoInfo(p => ({…p,
vehicle: data.vehicle,
year: data.year,
orderId: data.orderId,
customer: data.customer || “”,
}));
setRoLookup(“found”);
} else {
setRoLookup(“error”);
}
} catch(e) {
setApiDebug({ error: e.message });
setRoLookup(“error”);
}
}
};

const pushToShopmonkey = async (overrideLineId = null) => {
setPushState(“loading”);
setPushLog([]);
setShowLinePicker(false);

```
const allParts = [
  ...selectedParts.map(p=>({ name:p.name, partNum:p.part !== "-" ? p.part : "", price:getPrice(p), supplier:p.supplier !== "-" ? p.supplier : "" })),
  ...[...s1Custom,...s2Custom].filter(c=>c.name).map(c=>({ name:c.name, partNum:c.part||"", price:parseFloat(c.price)||0, supplier:c.supplier||"" }))
];

const TARGET_PHRASES = ["overhaul", "installation of transmission"];

if (demoMode) {
  // Simulate fetching service lines then find target
  await new Promise(r => setTimeout(r, 700));
  const lines = DEMO_SERVICE_LINES;
  setServiceLines(lines);

  const useLineId = overrideLineId || targetLineId;
  let targetLine = useLineId
    ? lines.find(l => l.id === useLineId)
    : lines.find(l => TARGET_PHRASES.some(ph => l.name.toLowerCase().includes(ph)));

  if (!targetLine && !useLineId) {
    // No match - show picker
    setShowLinePicker(true);
    setPushState("idle");
    return;
  }

  if (!targetLine) targetLine = lines.find(l => l.id === useLineId);
  setTargetLineId(targetLine.id);

  const log = [];
  for (const part of allParts) {
    await new Promise(r => setTimeout(r, 160));
    log.push({
      name: part.name,
      status: "success",
      id: "DEMO-" + (Math.random().toString(36).slice(2,8).toUpperCase()) + "",
      line: targetLine.name,
    });
    setPushLog([...log]);
  }
  setPushState("success");

} else {
  try {
    const base = relayUrl.replace(/[/]$/, "");
    const orderId = roInfo.orderId || roInfo.ro;

    // Get services via relay
    const svcRes = await fetch("" + (base) + "/api/order/" + (orderId) + "/services");
    const svcData = await svcRes.json();
    const lines = svcData.services || [];
    setServiceLines(lines);

    const useLineId = overrideLineId || targetLineId;
    let targetLine = useLineId
      ? lines.find(l => l.id === useLineId)
      : lines.find(l => TARGET_PHRASES.some(ph => l.name.toLowerCase().includes(ph)));

    if (!targetLine && !useLineId) {
      setShowLinePicker(true);
      setPushState("idle");
      return;
    }

    const log = [];
    for (const part of allParts) {
      try {
        const res = await fetch("" + (base) + "/api/order/" + (orderId) + "/service/" + (targetLine.id) + "/part", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: part.name,
            partNumber: part.partNum || "",
            retailPrice: part.price || 0,
            wholesalePrice: part.price || 0,
            quantity: 1,
            note: "Supplier: " + (part.supplier||"-") + " | Added via GearFlow",
          })
        });
        const d = await res.json();
        log.push({ name:part.name, status:d.success?"success":"error", id:d.data?.id||d.message||"-", line:targetLine.name });
      } catch(e) {
        log.push({ name:part.name, status:"error", id:e.message, line:targetLine?.name||"" });
      }
      setPushLog([...log]);
    }
    setPushState(log.every(l=>l.status==="success")?"success":"error");
  } catch(e) {
    setPushState("error");
    setPushLog([{ name:"Relay Error", status:"error", id:e.message, line:"" }]);
  }
}
```

};
const totalParts = selectedParts.reduce((s,p) => s + getPrice(p), 0) + customPartsTotal;

const makeLabel = MAKES[trans.make] || “#888”;

const failCount = REMOVAL_ITEMS.filter(i => s1Data[i.id]?.status === “Fail”).length;
const attnCount = REMOVAL_ITEMS.filter(i => s1Data[i.id]?.status === “Needs Attention”).length;

const generateTp = async (part) => {
if (tps[part.id]) { setOpenTp(part.id); return; }
setLoadingTp(p => ({…p, [part.id]: true}));
setOpenTp(part.id);
try {
const price = getPrice(part);
const res = await fetch(“https://api.anthropic.com/v1/messages”, {
method:“POST”, headers:{“Content-Type”:“application/json”},
body: JSON.stringify({
model:“claude-sonnet-4-20250514”, max_tokens:800,
system:“You are a transmission service advisor coach. Generate brief, honest talking points for “ + roInfo.trans + “ (” + trans.make + “) rebuild parts. Plain language only. Respond ONLY with JSON: {"why":"one sentence","risk":"one sentence","pitch":"one natural advisor sentence","pair":"one sentence companion part suggestion"}”,
messages:[{ role:“user”, content:“Part: “ + part.name + “ (” + (part.part || “no part#”) + “). Category: “ + part.category + “. “ + (price ? “Price: $” + price + “.” : “”) + “ “ + (s2Notes[part.id] ? “Tech note: “ + s2Notes[part.id] : “”) }]
})
});
const data = await res.json();
const text = data.content.map(b=>b.text||””).join(””);
const parsed = JSON.parse(text.replace(/`json|`/g,””).trim());
setTps(p => ({…p, [part.id]: parsed}));
} catch {
setTps(p => ({…p, [part.id]: {
why:“Recommended replacement during a full transmission rebuild.”,
risk:“Skipping may lead to early failure and a costly comeback.”,
pitch:“Since we already have the unit apart, now is the right time to handle this.”,
pair:“Consider pairing with the matching filter or seal kit.”
}}));
}
setLoadingTp(p => ({…p, [part.id]: false}));
};

// – SCREENS —————————————————————
return (
<div style={{ fontFamily:”‘Share Tech Mono’,‘Courier New’,monospace”, background:”#e8edf2”, minHeight:“100vh”, color:”#1a2230” }}>
<style>{`
@import url(‘https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@600;800&display=swap’);
*{box-sizing:border-box;margin:0;padding:0;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#c0ccd8;border-radius:2px;}

```
    /* -- BASE: light steel background, dark text -- */
    body{background:#e8edf2;}

    .hdr{background:#1a2230;border-bottom:3px solid #ff6b35;padding:12px 18px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:300;box-shadow:0 2px 12px rgba(0,0,0,0.3);}
    .logo{font-family:'Orbitron',sans-serif;font-size:18px;letter-spacing:4px;color:#ffffff;}
    .logo span{color:#ff6b35;}
    .nav{display:flex;gap:3px;}
    .nb{padding:7px 14px;border:1px solid #3a4a5a;background:transparent;color:#8899aa;font-family:'Share Tech Mono',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;border-radius:4px;transition:all .15s;}
    .nb.on{background:#ff6b35;color:#fff;border-color:#ff6b35;font-weight:600;}
    .nb:hover:not(.on){color:#ffffff;border-color:#5a6a7a;}
    .nb:disabled{opacity:.35;cursor:not-allowed;}

    .pg{padding:18px;max-width:920px;margin:0 auto;}
    .section-title{font-family:'Orbitron',sans-serif;font-size:11px;letter-spacing:4px;color:#ff6b35;text-transform:uppercase;margin-bottom:14px;padding-bottom:8px;border-bottom:2px solid #d0d8e0;}

    /* RO screen */
    .ro-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
    .fld{display:flex;flex-direction:column;gap:5px;}
    .flbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4a5a6a;font-weight:600;}
    .finput{background:#ffffff;border:2px solid #c0ccd8;border-radius:4px;padding:10px 13px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:13px;outline:none;transition:border-color .15s;box-shadow:0 1px 3px rgba(0,0,0,0.08);}
    .finput:focus{border-color:#ff6b35;}
    .finput::placeholder{color:#aabbcc;}
    select.finput{cursor:pointer;}

    .trans-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-bottom:24px;}
    .trans-card{background:#ffffff;border:2px solid #d0d8e0;border-radius:6px;padding:13px;cursor:pointer;transition:all .15s;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.08);}
    .trans-card:hover{border-color:#aabbcc;background:#f5f8fb;}
    .trans-card.sel{border-color:var(--mc);background:#fff8f5;box-shadow:0 2px 8px rgba(255,107,53,0.15);}
    .trans-label{font-family:'Orbitron',sans-serif;font-size:12px;letter-spacing:2px;color:#1a2230;margin-bottom:5px;}
    .trans-make{font-size:9px;letter-spacing:1px;color:var(--mc);text-transform:uppercase;font-weight:600;}

    .go-btn{width:100%;padding:15px;background:#ff6b35;color:#ffffff;border:none;border-radius:5px;font-family:'Orbitron',sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;cursor:pointer;transition:all .15s;font-weight:800;box-shadow:0 3px 10px rgba(255,107,53,0.3);}
    .go-btn:hover{background:#e85c28;}
    .go-btn:disabled{background:#c0ccd8;color:#8899aa;cursor:not-allowed;box-shadow:none;}

    /* Stage 1 */
    .rem-cat{margin-bottom:22px;}
    .cat-bar{display:flex;align-items:center;gap:8px;margin-bottom:10px;}
    .cat-pip{width:8px;height:8px;border-radius:2px;flex-shrink:0;}
    .cat-name{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#1a2230;font-weight:600;}
    .cat-ct{margin-left:auto;font-size:10px;color:#7a8a9a;font-weight:600;}

    .rem-item{background:#ffffff;border:2px solid #d0d8e0;border-radius:6px;padding:13px;margin-bottom:7px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
    .rem-item-top{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
    .rem-item-label{flex:1;font-size:13px;color:#1a2230;min-width:140px;font-weight:500;}
    .status-btns{display:flex;gap:5px;}
    .sbtn{padding:5px 11px;border-radius:4px;border:2px solid #d0d8e0;background:#f5f8fb;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s;color:#4a5a6a;font-weight:600;}
    .sbtn:hover{border-color:#aabbcc;color:#1a2230;}
    .sbtn.on{color:#ffffff;font-weight:700;border-color:transparent;}
    .rem-bottom{display:flex;gap:8px;margin-top:9px;flex-wrap:wrap;}
    .note-in{flex:1;background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;padding:6px 10px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:11px;outline:none;min-width:180px;}
    .note-in::placeholder{color:#aabbcc;}
    .note-in:focus{border-color:#ff6b35;}
    .photo-btn{padding:6px 12px;background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;color:#4a5a6a;font-size:10px;letter-spacing:1px;cursor:pointer;white-space:nowrap;transition:all .15s;font-weight:600;}
    .photo-btn.has{border-color:#0099cc;color:#0099cc;background:#f0f8ff;}
    .photo-btn:hover{border-color:#aabbcc;color:#1a2230;}

    /* custom rows */
    .custom-section{margin-top:20px;padding-top:16px;border-top:2px solid #d0d8e0;}
    .custom-title{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#ff6b35;margin-bottom:10px;font-weight:700;}
    .custom-row{display:grid;grid-template-columns:2fr 1.5fr 1fr 80px;gap:6px;margin-bottom:6px;align-items:center;}
    .ci{background:#ffffff;border:2px solid #d0d8e0;border-radius:4px;padding:8px 10px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:11px;outline:none;}
    .ci::placeholder{color:#aabbcc;}
    .ci:focus{border-color:#ff6b35;}

    /* sign off */
    .sign-bar{background:#1a2230;border-radius:6px;padding:16px;margin-top:20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;}
    .sign-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8899aa;flex-shrink:0;font-weight:600;}
    .init-in{background:#0d1520;border:2px solid #3a4a5a;border-radius:4px;padding:9px 13px;color:#ff6b35;font-family:'Orbitron',monospace;font-size:15px;letter-spacing:4px;width:95px;outline:none;text-transform:uppercase;}
    .init-in:focus{border-color:#ff6b35;}
    .sign-btn{padding:11px 22px;background:#ff6b35;color:#ffffff;border:none;border-radius:4px;font-family:'Orbitron',sans-serif;font-size:10px;letter-spacing:3px;cursor:pointer;flex-shrink:0;transition:all .15s;font-weight:700;}
    .sign-btn:hover{background:#e85c28;}
    .sign-btn:disabled{background:#3a4a5a;color:#5a6a7a;cursor:not-allowed;}
    .sign-btn.done{background:#22aa55;color:#ffffff;}

    /* Stats bar */
    .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:20px;}
    .stat-box{background:#ffffff;border:2px solid #d0d8e0;border-radius:5px;padding:12px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,0.07);}
    .stat-val{font-family:'Orbitron',sans-serif;font-size:24px;letter-spacing:2px;}
    .stat-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#7a8a9a;margin-top:3px;font-weight:600;}

    /* Stage 2 parts */
    .filter-bar{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:16px;}
    .fcb{padding:5px 12px;border-radius:4px;border:2px solid #d0d8e0;background:#ffffff;color:#4a5a6a;font-family:'Share Tech Mono',monospace;font-size:9px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s;font-weight:600;}
    .fcb.on{border-color:var(--c);color:var(--c);background:#fff;}
    .fcb:hover:not(.on){border-color:#aabbcc;color:#1a2230;}

    .cat-block{margin-bottom:22px;}
    .parts-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;}
    .pc{background:#ffffff;border:2px solid #d0d8e0;border-radius:6px;padding:13px;cursor:pointer;transition:all .15s;position:relative;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.07);}
    .pc:hover{border-color:#aabbcc;background:#f9fbfc;}
    .pc.sel{border-color:var(--c);background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.1);}
    .pc.sel::after{content:'';position:absolute;top:0;left:0;width:100%;height:3px;background:var(--c);}
    .chk{position:absolute;top:9px;right:9px;width:18px;height:18px;border-radius:3px;background:var(--c);display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;font-weight:bold;}
    .pc-name{font-size:12px;font-weight:700;color:#1a2230;margin-bottom:4px;line-height:1.3;}
    .pc-num{font-size:9px;color:#7a8a9a;margin-bottom:5px;font-family:'Share Tech Mono',monospace;}
    .pc-sup{display:inline-block;font-size:8px;letter-spacing:1px;text-transform:uppercase;padding:2px 6px;border:1px solid #d0d8e0;border-radius:3px;color:#4a5a6a;background:#f5f8fb;font-weight:600;}
    .pc-price-row{display:flex;align-items:center;margin-top:9px;}
    .pi{background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;padding:5px 8px;color:#e85c28;font-family:'Share Tech Mono',monospace;font-size:12px;width:85px;outline:none;font-weight:700;}
    .pi::placeholder{color:#aabbcc;}
    .pi:focus{border-color:#ff6b35;}
    .pfixed{font-size:13px;color:#e85c28;font-weight:700;}
    .pc-note{width:100%;margin-top:7px;background:#f5f8fb;border:2px solid #d0d8e0;border-radius:4px;padding:5px 8px;color:#1a2230;font-family:'Share Tech Mono',monospace;font-size:10px;resize:none;height:38px;outline:none;}
    .pc-note::placeholder{color:#aabbcc;}
    .pc-note:focus{border-color:#ff6b35;}

    /* sticky bottom */
    .sticky-bot{position:sticky;bottom:0;background:#1a2230;border-top:3px solid #ff6b35;padding:12px 18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;z-index:200;box-shadow:0 -4px 16px rgba(0,0,0,0.2);}
    .sb-stat{display:flex;flex-direction:column;gap:2px;}
    .sb-lbl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#6a7a8a;font-weight:600;}
    .sb-val{font-family:'Orbitron',sans-serif;font-size:20px;letter-spacing:2px;}
    .sb-val.cy{color:#00cfff;} .sb-val.og{color:#ff6b35;} .sb-val.gn{color:#22cc66;}
    .act-btn{padding:9px 18px;border:none;border-radius:4px;font-family:'Orbitron',sans-serif;font-size:9px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;transition:all .15s;flex-shrink:0;font-weight:700;}
    .act-btn.primary{background:#ff6b35;color:#fff;}
    .act-btn.primary:hover{background:#e85c28;}
    .act-btn.primary:disabled{background:#3a4a5a;color:#5a6a7a;cursor:not-allowed;}
    .act-btn.success{background:#22aa55;color:#fff;}

    /* Advisor */
    .adv-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:22px;}
    .adv-stat{background:#ffffff;border:2px solid #d0d8e0;border-radius:5px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,0.07);}
    .adv-stat-lbl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#7a8a9a;margin-bottom:5px;font-weight:600;}
    .adv-stat-val{font-family:'Orbitron',sans-serif;font-size:26px;letter-spacing:2px;}

    .adv-item{background:#ffffff;border:2px solid #d0d8e0;border-radius:7px;margin-bottom:8px;overflow:hidden;transition:border-color .15s;box-shadow:0 1px 4px rgba(0,0,0,0.07);}
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

    .tp-wrap{padding:0 16px 16px;border-top:2px solid #eef2f6;padding-top:14px;background:#f9fbfc;}
    .tp-load{display:flex;align-items:center;gap:8px;color:#7a8a9a;font-size:10px;font-weight:600;}
    .spin{width:13px;height:13px;border:2px solid #d0d8e0;border-top-color:#ff6b35;border-radius:50%;animation:sp .6s linear infinite;}
    @keyframes sp{to{transform:rotate(360deg);}}
    .tp-pitch{background:#fff8f5;border:2px solid #ff6b35;border-radius:4px;padding:13px;margin-bottom:8px;}
    .tp-pitch-lbl{font-size:8px;letter-spacing:2px;color:#ff6b35;margin-bottom:7px;font-weight:700;}
    .tp-pitch-txt{font-size:12px;color:#1a2230;line-height:1.65;font-weight:500;}
    .tp-row{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:7px;}
    .tp-c{background:#ffffff;border:2px solid #d0d8e0;border-radius:4px;padding:11px;}
    .tp-cl{font-size:8px;letter-spacing:2px;color:#7a8a9a;margin-bottom:6px;font-weight:700;text-transform:uppercase;}
    .tp-ct{font-size:11px;color:#2a3a4a;line-height:1.6;}
    .tp-pair{background:#f0fff5;border:2px solid #22aa55;border-radius:4px;padding:11px;}
    .tp-pair .tp-cl{color:#22aa55;}
    .tp-tech-note{margin-top:8px;padding:7px 11px;background:#f5f8fb;border-left:3px solid #c0ccd8;font-size:10px;color:#4a5a6a;font-style:italic;}

    /* removal summary for advisor */
    .rem-flags{margin-bottom:20px;}
    .flag-item{display:flex;align-items:center;gap:10px;padding:9px 13px;background:#ffffff;border-radius:5px;margin-bottom:5px;border-left:4px solid var(--fc);box-shadow:0 1px 3px rgba(0,0,0,0.07);}
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
  `}</style>

  {/* HEADER */}
  <div className="hdr">
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <div className="logo">GEAR<span>FLOW</span></div>
      {demoMode && <span style={{fontSize:9,letterSpacing:2,background:"#ff9800",color:"#fff",padding:"2px 8px",borderRadius:3,fontWeight:700,textTransform:"uppercase"}}>DEMO</span>}
      {!demoMode && apiKey && <span style={{fontSize:9,letterSpacing:2,background:"#22aa55",color:"#fff",padding:"2px 8px",borderRadius:3,fontWeight:700,textTransform:"uppercase"}}>LIVE</span>}
    </div>
    <div className="nav">
      <button className={"nb " + (screen==="ro"?"on":"") + ""} onClick={()=>setScreen("ro")}>RO</button>
      <button className={"nb " + (screen==="stage1"?"on":"") + ""} onClick={()=>setScreen("stage1")} disabled={!roInfo.ro}>S1: Removal</button>
      <button className={"nb " + (screen==="stage2"?"on":"") + ""} onClick={()=>setScreen("stage2")} disabled={!s1Signed}>S2: Strip</button>
      <button className={"nb " + (screen==="advisor"?"on":"") + ""} onClick={()=>setScreen("advisor")} disabled={!s2Signed}>Advisor</button>
      <button className={"nb " + (screen==="settings"?"on":"") + ""} onClick={()=>setScreen("settings")}>⚙</button>
    </div>
  </div>

  {/* -- RO SCREEN --------------------------------------------------- */}
  {screen === "ro" && (
    <div className="pg">
      <div className="section-title">New Service Order</div>

      {/* Shopmonkey RO Lookup */}
      <div style={{background:"#1a2230",borderRadius:6,padding:16,marginBottom:20}}>
        <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#8899aa",marginBottom:10,fontWeight:700}}>
          {demoMode ? "🔵 Demo Mode - Shopmonkey Lookup" : "🟢 Live - Shopmonkey Lookup"}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <input
            className="finput"
            style={{background:"#0d1520",color:"#ffffff",borderColor:"#3a4a5a",flex:1,minWidth:140}}
            placeholder={demoMode?"Try: RO-1001 to RO-1008":"Enter RO number"}
            value={roInfo.ro}
            onChange={e=>{setRoInfo(p=>({...p,ro:e.target.value}));setRoLookup("idle");}}
            onKeyDown={e=>e.key==="Enter"&&lookupRO()}
          />
          <button
            onClick={lookupRO}
            disabled={!roInfo.ro||roLookup==="loading"}
            style={{padding:"10px 18px",background:"#ff6b35",color:"#fff",border:"none",borderRadius:4,fontFamily:"'Orbitron',sans-serif",fontSize:10,letterSpacing:2,cursor:"pointer",flexShrink:0,opacity:(!roInfo.ro||roLookup==="loading")?0.5:1}}
          >{roLookup==="loading"?"Searching...":"Lookup RO →"}</button>
        </div>
        {roLookup==="found" && (
          <div style={{marginTop:10,padding:"8px 12px",background:"#22aa5522",border:"1px solid #22aa55",borderRadius:4,fontSize:11,color:"#22aa55",fontWeight:600}}>
            ✓ Found - {roInfo.vehicle} · {roInfo.year} {roInfo.orderId && <span style={{fontSize:9,opacity:0.7}}>· ID: {roInfo.orderId}</span>}
          </div>
        )}
        {roLookup==="error" && (
          <div style={{marginTop:10,padding:"10px 12px",background:"#f4433622",border:"1px solid #f44336",borderRadius:4,fontSize:11,color:"#f44336"}}>
            <div style={{fontWeight:700,marginBottom:6}}>✗ RO not found in Shopmonkey</div>
            {!demoMode && (
              <div style={{fontSize:10,color:"#ff8a80",lineHeight:1.7}}>
                Check: your RO number in Shopmonkey may be a display number - the API filters by the <strong>number</strong> field. Try entering just the digits (e.g. <strong>10600252</strong>) without any prefix. Also confirm your API key has Work Orders read permission.
              </div>
            )}
            <div style={{marginTop:6,fontSize:10,color:"#ff8a80"}}>Fill in details manually below or adjust the RO number format.</div>
          </div>
        )}
        {/* Debug panel - shows raw API response to diagnose issues */}
        {!demoMode && apiDebug && roLookup==="error" && (
          <div style={{marginTop:10,background:"#1a2230",borderRadius:5,padding:14,border:"1px solid #2a3a4a"}}>
            <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#ff9800",marginBottom:10,fontWeight:700}}>🔍 API Debug Info</div>
            <div style={{display:"flex",flexDirection:"column",gap:6,fontFamily:"'Share Tech Mono',monospace",fontSize:10}}>
              <div style={{display:"flex",gap:8}}>
                <span style={{color:"#4a5a6a",minWidth:100}}>HTTP Status:</span>
                <span style={{color:apiDebug.status===200?"#22aa55":"#f44336",fontWeight:700}}>{apiDebug.status}</span>
              </div>
              {apiDebug.count !== undefined && (
                <div style={{display:"flex",gap:8}}>
                  <span style={{color:"#4a5a6a",minWidth:100}}>Results:</span>
                  <span style={{color:"#c0ccd8"}}>{apiDebug.count} orders returned</span>
                </div>
              )}
              {apiDebug.sampleOrder && (
                <div style={{marginTop:4}}>
                  <div style={{color:"#4a5a6a",marginBottom:4}}>Sample order fields (shows what number field looks like):</div>
                  <div style={{background:"#0d1520",padding:"8px 10px",borderRadius:3,color:"#ff9800",wordBreak:"break-all"}}>
                    {JSON.stringify(apiDebug.sampleOrder, null, 2)}
                  </div>
                </div>
              )}
              {apiDebug.error && (
                <div style={{display:"flex",gap:8}}>
                  <span style={{color:"#4a5a6a",minWidth:100}}>Error:</span>
                  <span style={{color:"#f44336"}}>{apiDebug.error}</span>
                </div>
              )}
              {apiDebug.rawSample && (
                <div style={{marginTop:4}}>
                  <div style={{color:"#4a5a6a",marginBottom:4}}>Raw response (first 600 chars):</div>
                  <div style={{background:"#0d1520",padding:"8px 10px",borderRadius:3,color:"#7a9a7a",fontSize:9,wordBreak:"break-all",maxHeight:120,overflow:"auto"}}>
                    {apiDebug.rawSample}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="ro-grid">
        <div className="fld">
          <label className="flbl">Year</label>
          <input className="finput" placeholder="2021" value={roInfo.year} onChange={e=>setRoInfo(p=>({...p,year:e.target.value}))} />
        </div>
        <div className="fld" style={{gridColumn:"1/-1"}}>
          <label className="flbl">Vehicle</label>
          <input className="finput" placeholder="2021 Ram 3500 6.7L Cummins" value={roInfo.vehicle} onChange={e=>setRoInfo(p=>({...p,vehicle:e.target.value}))} />
        </div>
      </div>

      <div className="section-title">Select Service Type</div>
      {SERVICE_TYPE_GROUPS.map(group => (
        <div key={group.label} style={{marginBottom:18}}>
          <div style={{fontSize:9,letterSpacing:3,textTransform:"uppercase",color:group.color,fontWeight:700,marginBottom:8,display:"flex",alignItems:"center",gap:6}}>
            <div style={{width:6,height:6,borderRadius:2,background:group.color,flexShrink:0}}/>
            {group.label}
          </div>
          <div className="trans-grid">
            {group.keys.map(key => {
              const svc = ALL_SERVICES[key];
              if (!svc) return null;
              return (
                <div
                  key={key}
                  className={"trans-card " + (roInfo.trans===key?"sel":"") + ""}
                  style={{"--mc": MAKES[svc.make]||group.color}}
                  onClick={()=>setRoInfo(p=>({...p,trans:key}))}
                >
                  {svc.icon && <div style={{fontSize:18,marginBottom:4}}>{svc.icon}</div>}
                  <div className="trans-label">{svc.label}</div>
                  <div className="trans-make">{svc.make}</div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button className="go-btn" disabled={!roInfo.ro||!roInfo.vehicle} onClick={()=>setScreen("stage1")}>
        Start Stage 1 - Removal →
      </button>
    </div>
  )}

  {/* -- STAGE 1: REMOVAL -------------------------------------------- */}
  {screen === "stage1" && (
    <>
    <div className="pg">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <div>
          <div className="section-title" style={{marginBottom:2}}>Stage 1 - Removal Inspection</div>
          <div style={{fontSize:10,color:"#334455",letterSpacing:1}}>{roInfo.vehicle} · {roInfo.ro} · <span style={{color:makeLabel}}>{trans.label}</span></div>
        </div>
        <div className="stats-row" style={{margin:0,width:"auto"}}>
          <div className="stat-box"><div className="stat-val" style={{color:"#f44336"}}>{failCount}</div><div className="stat-lbl">Fail</div></div>
          <div className="stat-box"><div className="stat-val" style={{color:"#ff9800"}}>{attnCount}</div><div className="stat-lbl">Attn</div></div>
          <div className="stat-box"><div className="stat-val" style={{color:"#4caf50"}}>{REMOVAL_ITEMS.filter(i=>s1Data[i.id]?.status==="Pass").length}</div><div className="stat-lbl">Pass</div></div>
        </div>
      </div>

      {Object.entries(REM_CATS).map(([cat, catInfo]) => {
        const items = REMOVAL_ITEMS.filter(i=>i.category===cat);
        const checked = items.filter(i=>s1Data[i.id]?.status).length;
        return (
          <div className="rem-cat" key={cat}>
            <div className="cat-bar">
              <div className="cat-pip" style={{background:catInfo.color}} />
              <span className="cat-name">{catInfo.label}</span>
              <span className="cat-ct">{checked}/{items.length}</span>
            </div>
            {items.map(item => {
              const d = s1Data[item.id] || {};
              return (
                <div className="rem-item" key={item.id}>
                  <div className="rem-item-top">
                    <span className="rem-item-label">{item.label}</span>
                    <div className="status-btns">
                      {STATUS_OPTS.map(s=>(
                        <button
                          key={s}
                          className={"sbtn " + (d.status===s?"on":"") + ""}
                          style={d.status===s?{background:STATUS_COLORS[s],borderColor:STATUS_COLORS[s]}:{}}
                          onClick={()=>setS1Item(item.id,"status",d.status===s?"":s)}
                        >{s==="Needs Attention"?"Attn":s}</button>
                      ))}
                    </div>
                  </div>
                  <div className="rem-bottom">
                    <input
                      className="note-in"
                      placeholder="Tech note..."
                      value={d.note||""}
                      onChange={e=>setS1Item(item.id,"note",e.target.value)}
                    />
                    {item.photo && (
                      <>
                        <input
                          type="file" accept="image/*" capture="environment"
                          style={{display:"none"}}
                          ref={el=>photoRefs.current[item.id]=el}
                          onChange={e=>{
                            const f=e.target.files[0];
                            if(f){const url=URL.createObjectURL(f);setS1Item(item.id,"photo",url);}
                          }}
                        />
                        <button
                          className={"photo-btn " + (d.photo?"has":"") + ""}
                          onClick={()=>photoRefs.current[item.id]?.click()}
                        >{d.photo?"📷 Photo Taken":"📷 Add Photo"}</button>
                      </>
                    )}
                  </div>
                  {d.photo && <img src={d.photo} alt="finding" style={{marginTop:6,width:"100%",maxHeight:120,objectFit:"cover",borderRadius:3,border:"1px solid #1a2535"}} />}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Custom rows Stage 1 */}
      <div className="custom-section">
        <div className="custom-title">Additional Parts Required - Removal Tech</div>
        {s1Custom.map((row,i)=>(
          <div className="custom-row" key={i}>
            <input className="ci" placeholder="Part name" value={row.name} onChange={e=>{const c=[...s1Custom];c[i]={...c[i],name:e.target.value};setS1Custom(c);}} />
            <input className="ci" placeholder="Part #" value={row.part} onChange={e=>{const c=[...s1Custom];c[i]={...c[i],part:e.target.value};setS1Custom(c);}} />
            <input className="ci" placeholder="Supplier" value={row.supplier} onChange={e=>{const c=[...s1Custom];c[i]={...c[i],supplier:e.target.value};setS1Custom(c);}} />
            <input className="ci" placeholder="$" value={row.price} onChange={e=>{const c=[...s1Custom];c[i]={...c[i],price:e.target.value};setS1Custom(c);}} />
          </div>
        ))}
      </div>

      {/* Sign Off */}
      <div className="sign-bar">
        <span className="sign-label">Removal Tech Sign-Off</span>
        <input className="init-in" placeholder="INI" maxLength={4} value={s1Initials} onChange={e=>setS1Initials(e.target.value.toUpperCase())} disabled={s1Signed} />
        <button
          className={"sign-btn " + (s1Signed?"done":"") + ""}
          disabled={s1Initials.length<2 || s1Signed}
          onClick={()=>{ setS1Signed(true); setScreen("stage2"); }}
        >{s1Signed?"✓ Signed - " + (s1Initials) + "":"Sign & Advance to Strip →"}</button>
      </div>
      <div style={{height:70}}/>
    </div>
    </>
  )}

  {/* -- STAGE 2: STRIP DOWN ----------------------------------------- */}
  {screen === "stage2" && (
    <>
    <div className="pg">
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16,flexWrap:"wrap",gap:8}}>
        <div>
          <div className="section-title" style={{marginBottom:2}}>Stage 2 - Strip Down & Parts Selection</div>
          <div style={{fontSize:10,color:"#334455",letterSpacing:1}}>{roInfo.vehicle} · {roInfo.ro} · <span style={{color:makeLabel}}>{trans.label}</span> · S1: <span style={{color:"#00cfff"}}>{s1Initials}</span></div>
        </div>
      </div>

      {/* S1 flag summary */}
      {(failCount > 0 || attnCount > 0) && (
        <div className="rem-flags" style={{marginBottom:16}}>
          <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#2a3a4a",marginBottom:8}}>Stage 1 Flags from {s1Initials}</div>
          {REMOVAL_ITEMS.filter(i=>s1Data[i.id]?.status&&s1Data[i.id].status!=="Pass").map(item=>(
            <div className="flag-item" key={item.id} style={{"--fc":STATUS_COLORS[s1Data[item.id].status]}}>
              <span className="flag-status">{s1Data[item.id].status}</span>
              <span className="flag-name">{item.label}</span>
              {s1Data[item.id].note && <span className="flag-note">{s1Data[item.id].note}</span>}
            </div>
          ))}
        </div>
      )}

      <div className="filter-bar">
        <button className={"fcb " + (filterCat==="all"?"on":"") + ""} style={{"--c":"#00cfff"}} onClick={()=>setFilterCat("all")}>All</button>
        {Object.entries(trans.categories).map(([k,v])=>(
          <button key={k} className={"fcb " + (filterCat===k?"on":"") + ""} style={{"--c":v.color}} onClick={()=>setFilterCat(k)}>{v.label}</button>
        ))}
      </div>

      {Object.entries(trans.categories)
        .filter(([k])=>filterCat==="all"||filterCat===k)
        .map(([cat,catInfo])=>{
          const parts = trans.parts.filter(p=>p.category===cat);
          const selCount = parts.filter(p=>s2Selected[p.id]).length;
          return (
            <div className="cat-block" key={cat}>
              <div className="cat-bar">
                <div className="cat-pip" style={{background:catInfo.color}} />
                <span className="cat-name">{catInfo.label}</span>
                <span className="cat-ct">{selCount}/{parts.length}</span>
              </div>
              <div className="parts-grid">
                {parts.map(part=>{
                  const isSel = !!s2Selected[part.id];
                  const hasFixed = part.price !== null;
                  const showPart = roInfo.trans !== "CVT";
                  return (
                    <div key={part.id} className={"pc " + (isSel?"sel":"") + ""} style={{"--c":catInfo.color}} onClick={()=>togglePart(part.id)}>
                      {isSel && <div className="chk">✓</div>}
                      <div className="pc-name">{part.name}</div>
                      {showPart && part.part && part.part !== "-" && <div className="pc-num">{part.part}</div>}
                      {showPart && part.supplier && part.supplier !== "-" && <span className="pc-sup">{part.supplier}</span>}
                      {isSel && (
                        <div className="pc-price-row" onClick={e=>e.stopPropagation()}>
                          {hasFixed
                            ? <span className="pfixed">${part.price}</span>
                            : <input className="pi" placeholder="$ price" value={s2Prices[part.id]||""} onChange={e=>setS2Prices(p=>({...p,[part.id]:e.target.value}))} />
                          }
                        </div>
                      )}
                      {isSel && (
                        <textarea className="pc-note" placeholder="Lead tech note..." value={s2Notes[part.id]||""} onChange={e=>setS2Notes(p=>({...p,[part.id]:e.target.value}))} onClick={e=>e.stopPropagation()} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      {/* Custom rows Stage 2 */}
      <div className="custom-section">
        <div className="custom-title">Additional Parts Required - Strip Down Tech</div>
        {s2Custom.map((row,i)=>(
          <div className="custom-row" key={i}>
            <input className="ci" placeholder="Part name" value={row.name} onChange={e=>{const c=[...s2Custom];c[i]={...c[i],name:e.target.value};setS2Custom(c);}} />
            <input className="ci" placeholder="Part #" value={row.part} onChange={e=>{const c=[...s2Custom];c[i]={...c[i],part:e.target.value};setS2Custom(c);}} />
            <input className="ci" placeholder="Supplier" value={row.supplier} onChange={e=>{const c=[...s2Custom];c[i]={...c[i],supplier:e.target.value};setS2Custom(c);}} />
            <input className="ci" placeholder="$" value={row.price} onChange={e=>{const c=[...s2Custom];c[i]={...c[i],price:e.target.value};setS2Custom(c);}} />
          </div>
        ))}
      </div>

      {/* Sign Off */}
      <div className="sign-bar">
        <span className="sign-label">Lead Tech Sign-Off</span>
        <input className="init-in" placeholder="INI" maxLength={4} value={s2Initials} onChange={e=>setS2Initials(e.target.value.toUpperCase())} disabled={s2Signed} />
        <button
          className={"sign-btn " + (s2Signed?"done":"") + ""}
          disabled={s2Initials.length<2 || s2Signed || selectedParts.length===0}
          onClick={()=>{ setS2Signed(true); setScreen("advisor"); }}
        >{s2Signed?"✓ Approved - " + (s2Initials) + "":"Approve & Send to Advisor →"}</button>
      </div>
      <div style={{height:70}}/>
    </div>

    <div className="sticky-bot">
      <div className="sb-stat"><span className="sb-lbl">Parts</span><span className="sb-val og">{selectedParts.length}</span></div>
      <div className="sb-stat"><span className="sb-lbl">Est. Total</span><span className="sb-val gn">{totalParts>0?"$" + (totalParts.toLocaleString()) + "":"-"}</span></div>
      <div style={{flex:1}}/>
    </div>
    </>
  )}

  {/* -- ADVISOR SCREEN ---------------------------------------------- */}
  {screen === "advisor" && (
    <div className="pg">
      {!s2Signed ? (
        <div className="empty"><div className="empty-ico">🔒</div><div className="empty-txt">Awaiting Stage 2 lead tech approval.</div></div>
      ) : (
        <>
          <div style={{marginBottom:16}}>
            <div className="section-title" style={{marginBottom:2}}>Advisor Quote Sheet</div>
            <div style={{fontSize:10,color:"#334455",letterSpacing:1}}>
              {roInfo.vehicle} · {roInfo.ro} · <span style={{color:makeLabel}}>{trans.label}</span>
              {" "}· S1: <span style={{color:"#00cfff"}}>{s1Initials}</span>
              {" "}· S2: <span style={{color:"#4caf50"}}>{s2Initials}</span>
            </div>
          </div>

          <div className="adv-cards">
            <div className="adv-stat"><div className="adv-stat-lbl">Parts Selected</div><div className="adv-stat-val" style={{color:"#ff6b35"}}>{selectedParts.length}</div></div>
            <div className="adv-stat"><div className="adv-stat-lbl">Est. Parts Cost</div><div className="adv-stat-val" style={{color:"#4caf50"}}>{totalParts>0?"$" + (totalParts.toLocaleString()) + "":"-"}</div></div>
            <div className="adv-stat"><div className="adv-stat-lbl">Stage 1 Flags</div><div className="adv-stat-val" style={{color:"#ff9800"}}>{failCount+attnCount}</div></div>
          </div>

          {/* Removal flags summary */}
          {(failCount>0||attnCount>0) && (
            <div style={{marginBottom:20}}>
              <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#2a3a4a",marginBottom:8}}>Removal Findings - Tech {s1Initials}</div>
              {REMOVAL_ITEMS.filter(i=>s1Data[i.id]?.status&&s1Data[i.id].status!=="Pass").map(item=>(
                <div className="flag-item" key={item.id} style={{"--fc":STATUS_COLORS[s1Data[item.id].status]}}>
                  <span className="flag-status">{s1Data[item.id].status}</span>
                  <span className="flag-name">{item.label}</span>
                  {s1Data[item.id].note && <span className="flag-note">{s1Data[item.id].note}</span>}
                </div>
              ))}
            </div>
          )}

          <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#2a3a4a",marginBottom:10}}>Parts - Tap for Talking Points</div>

          {selectedParts.map(part=>{
            const cat = trans.categories[part.category];
            const price = getPrice(part);
            const isOpen = openTp===part.id;
            const tp = tps[part.id];
            const isLoading = loadingTp[part.id];
            const showPart = roInfo.trans !== "CVT";
            return (
              <div key={part.id} className={"adv-item " + (isOpen?"open":"") + ""}>
                <div className="adv-hdr" onClick={()=>generateTp(part)}>
                  <div className="adv-info">
                    <div className="adv-name">{part.name}</div>
                    <div className="adv-sub" style={{color:cat?.color}}>{cat?.label}</div>
                    {showPart && part.part && part.part!=="-" && <div className="adv-num">{part.part} · {part.supplier}</div>}
                  </div>
                  {price>0 && <div className="adv-price">${price.toLocaleString()}</div>}
                  <div className="adv-arr">▶</div>
                </div>
                {isOpen && (
                  <div className="tp-wrap">
                    {isLoading ? (
                      <div className="tp-load"><div className="spin"/>Generating talking points...</div>
                    ) : tp ? (
                      <>
                        <div className="tp-pitch">
                          <div className="tp-pitch-lbl">💬 Say This</div>
                          <div className="tp-pitch-txt">"{tp.pitch}"</div>
                        </div>
                        <div className="tp-row">
                          <div className="tp-c"><div className="tp-cl">Why It Matters</div><div className="tp-ct">{tp.why}</div></div>
                          <div className="tp-c"><div className="tp-cl">Risk of Skipping</div><div className="tp-ct">{tp.risk}</div></div>
                        </div>
                        <div className="tp-pair"><div className="tp-cl">💡 Pair With</div><div className="tp-ct">{tp.pair}</div></div>
                        {s2Notes[part.id] && <div className="tp-tech-note">Lead tech note: {s2Notes[part.id]}</div>}
                      </>
                    ) : null}
                  </div>
                )}
              </div>
            );
          })}

          {/* Custom parts from both stages */}
          {[...s1Custom,...s2Custom].filter(c=>c.name).length > 0 && (
            <div style={{marginTop:16}}>
              <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#2a3a4a",marginBottom:8}}>Additional Parts Flagged by Techs</div>
              {[...s1Custom.map(c=>({...c,stage:"S1"})),...s2Custom.map(c=>({...c,stage:"S2"}))].filter(c=>c.name).map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 14px",background:"#0a0e18",borderRadius:4,marginBottom:5,border:"1px solid #111d2a"}}>
                  <span style={{fontSize:8,letterSpacing:1,color:"#00cfff",background:"#00cfff11",padding:"2px 6px",borderRadius:2}}>{c.stage}</span>
                  <span style={{flex:1,fontSize:11,color:"#aabbc0"}}>{c.name}</span>
                  {c.part && <span style={{fontSize:9,color:"#1a2535"}}>{c.part}</span>}
                  {c.supplier && <span style={{fontSize:9,color:"#334455"}}>{c.supplier}</span>}
                  {c.price && <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:14,color:"#4caf50"}}>${parseFloat(c.price).toLocaleString()}</span>}
                </div>
              ))}
            </div>
          )}

          <div className="total-row">
            <span style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#2a3a4a"}}>Total Parts Est.</span>
            <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:28,letterSpacing:3,color:"#4caf50"}}>{totalParts>0?"$" + (totalParts.toLocaleString()) + "":"-"}</span>
          </div>

          {/* -- PUSH TO SHOPMONKEY -- */}
          <div style={{marginTop:24,background:"#1a2230",borderRadius:8,padding:20}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14,flexWrap:"wrap",gap:8}}>
              <div>
                <div style={{fontFamily:"'Orbitron',sans-serif",fontSize:11,letterSpacing:3,color:"#ffffff",marginBottom:3}}>PUSH TO SHOPMONKEY</div>
                <div style={{fontSize:9,color:"#8899aa",letterSpacing:1}}>
                  {demoMode ? "Demo mode - simulates sub-line item creation" : "Live - targeting RO " + (roInfo.ro) + ""}
                </div>
                {targetLineId && serviceLines.length > 0 && (
                  <div style={{marginTop:6,fontSize:10,color:"#22aa55",fontWeight:600}}>
                    ✓ Target line: {serviceLines.find(l=>l.id===targetLineId)?.name}
                  </div>
                )}
                {!targetLineId && (
                  <div style={{marginTop:6,fontSize:10,color:"#ff9800"}}>
                    Will auto-target line containing "overhaul" or "installation of transmission"
                  </div>
                )}
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end"}}>
                {pushState==="success" && (
                  <button
                    onClick={()=>{setTargetLineId(null);setShowLinePicker(false);}}
                    style={{padding:"5px 12px",background:"transparent",border:"1px solid #3a4a5a",borderRadius:3,color:"#6a7a8a",fontSize:9,letterSpacing:1,cursor:"pointer",fontFamily:"'Share Tech Mono',monospace"}}
                  >Change Line</button>
                )}
                <button
                  onClick={()=>pushToShopmonkey()}
                  disabled={pushState==="loading"||pushState==="success"||(selectedParts.length===0&&[...s1Custom,...s2Custom].filter(c=>c.name).length===0)}
                  style={{
                    padding:"12px 24px",border:"none",borderRadius:5,
                    fontFamily:"'Orbitron',sans-serif",fontSize:10,letterSpacing:3,fontWeight:700,
                    cursor:"pointer",transition:"all .15s",whiteSpace:"nowrap",
                    background: pushState==="success"?"#22aa55":pushState==="error"?"#f44336":"#ff6b35",
                    color:"#fff",
                    opacity:(pushState==="loading")?0.7:1
                  }}
                >
                  {pushState==="idle"&&"Push to Work Order →"}
                  {pushState==="loading"&&"Pushing..."}
                  {pushState==="success"&&"✓ Added to Work Order"}
                  {pushState==="error"&&"⚠ Some Items Failed"}
                </button>
              </div>
            </div>

            {/* -- LINE PICKER (no match found) -- */}
            {showLinePicker && serviceLines.length > 0 && (
              <div style={{marginBottom:16,background:"#0d1520",borderRadius:6,padding:16,border:"2px solid #ff9800"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
                  <span style={{fontSize:16}}>{"⚠"}</span>
                  <div>
                    <div style={{fontSize:11,color:"#ff9800",fontWeight:700,marginBottom:2}}>No matching service line found</div>
                    <div style={{fontSize:10,color:"#6a7a8a"}}>No line contains "overhaul" or "installation of transmission". Select the correct line below:</div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  {serviceLines.map(line=>(
                    <button
                      key={line.id}
                      onClick={()=>{ setTargetLineId(line.id); pushToShopmonkey(line.id); }}
                      style={{
                        display:"flex",alignItems:"center",justifyContent:"space-between",
                        padding:"11px 14px",background:"#111d2a",border:"2px solid #2a3a4a",
                        borderRadius:5,cursor:"pointer",transition:"all .15s",textAlign:"left",
                        gap:12,
                      }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor="#ff6b35"}
                      onMouseLeave={e=>e.currentTarget.style.borderColor="#2a3a4a"}
                    >
                      <div style={{flex:1}}>
                        <div style={{fontSize:12,color:"#c0ccd8",fontWeight:600,marginBottom:2}}>{line.name}</div>
                        <div style={{fontSize:9,color:"#4a5a6a",fontFamily:"'Share Tech Mono',monospace"}}>{line.id}</div>
                      </div>
                      {line.labor > 0 && (
                        <div style={{fontSize:12,color:"#7a8a9a",fontFamily:"'Orbitron',sans-serif",flexShrink:0}}>${line.labor.toLocaleString()}</div>
                      )}
                      <div style={{fontSize:12,color:"#3a4a5a",flexShrink:0}}>→</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={()=>setShowLinePicker(false)}
                  style={{marginTop:10,padding:"7px 14px",background:"transparent",border:"1px solid #2a3a4a",borderRadius:4,color:"#6a7a8a",fontSize:10,cursor:"pointer",fontFamily:"'Share Tech Mono',monospace",letterSpacing:1}}
                >Cancel</button>
              </div>
            )}

            {/* -- PUSH LOG -- */}
            {pushLog.length > 0 && (
              <div style={{borderTop:"1px solid #2a3a4a",paddingTop:14}}>
                <div style={{fontSize:9,letterSpacing:2,textTransform:"uppercase",color:"#6a7a8a",marginBottom:10,fontWeight:600}}>
                  Push Log - {pushLog[0]?.line && <span style={{color:"#ff6b35"}}>{pushLog[0].line}</span>}
                </div>
                <div style={{maxHeight:220,overflowY:"auto",display:"flex",flexDirection:"column",gap:5}}>
                  {pushLog.map((l,i)=>(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 10px",background:"#0d1520",borderRadius:4,borderLeft:"3px solid " + (l.status==="success"?"#22aa55":"#f44336") + ""}}>
                      <span style={{fontSize:11,color:l.status==="success"?"#22aa55":"#f44336",flexShrink:0}}>{l.status==="success"?"✓":"✗"}</span>
                      <span style={{flex:1,fontSize:11,color:"#c0ccd8"}}>{l.name}</span>
                      <span style={{fontSize:9,color:"#4a5a6a",fontFamily:"'Share Tech Mono',monospace"}}>{l.id}</span>
                    </div>
                  ))}
                </div>
                {pushState==="success" && (
                  <div style={{marginTop:12,padding:"10px 14px",background:"#22aa5522",border:"1px solid #22aa55",borderRadius:4,fontSize:11,color:"#22aa55",fontWeight:700,textAlign:"center"}}>
                    ✓ {pushLog.length} part{pushLog.length!==1?"s":""} added as sub-line items under "{pushLog[0]?.line}" in {demoMode?"demo ":""}Shopmonkey
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )}

  {/* -- SETTINGS SCREEN --------------------------------------------- */}
  {screen === "settings" && (
    <div className="pg">
      <div className="section-title">Settings & Shopmonkey API</div>

      {/* Mode Toggle */}
      <div style={{background:"#ffffff",border:"2px solid #d0d8e0",borderRadius:8,padding:20,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#1a2230",marginBottom:4,letterSpacing:1}}>Connection Mode</div>
        <div style={{fontSize:11,color:"#7a8a9a",marginBottom:16}}>Switch between demo and live Shopmonkey connection.</div>
        <div style={{display:"flex",gap:8}}>
          <button
            onClick={()=>setDemoMode(true)}
            style={{flex:1,padding:"12px",border:"2px solid " + (demoMode?"#ff9800":"#d0d8e0") + "",borderRadius:5,background:demoMode?"#fff8f0":"#f5f8fb",color:demoMode?"#ff9800":"#4a5a6a",fontFamily:"'Orbitron',sans-serif",fontSize:10,letterSpacing:2,cursor:"pointer",fontWeight:700}}
          >🔵 Demo Mode</button>
          <button
            onClick={()=>setDemoMode(false)}
            style={{flex:1,padding:"12px",border:"2px solid " + (!demoMode?"#22aa55":"#d0d8e0") + "",borderRadius:5,background:!demoMode?"#f0fff5":"#f5f8fb",color:!demoMode?"#22aa55":"#4a5a6a",fontFamily:"'Orbitron',sans-serif",fontSize:10,letterSpacing:2,cursor:"pointer",fontWeight:700}}
          >🟢 Live Mode</button>
        </div>
        {demoMode && (
          <div style={{marginTop:12,padding:"10px 14px",background:"#fff8f0",border:"1px solid #ffcc80",borderRadius:4,fontSize:11,color:"#e65100"}}>
            Demo mode uses simulated data. RO lookup and push are fully functional for testing - no real Shopmonkey data is accessed.
          </div>
        )}
      </div>

      {/* Relay URL */}
      <div style={{background:"#ffffff",border:"2px solid #d0d8e0",borderRadius:8,padding:20,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#1a2230",marginBottom:4,letterSpacing:1}}>Railway Relay URL</div>
        <div style={{fontSize:11,color:"#7a8a9a",marginBottom:16}}>
          The URL of your deployed GearFlow relay on Railway. Looks like <code style={{background:"#f5f8fb",padding:"1px 5px",borderRadius:3}}>https://gearflow-relay-production.up.railway.app</code>
        </div>
        <div className="fld">
          <label className="flbl">Relay URL</label>
          <input
            className="finput"
            placeholder="https://your-relay.up.railway.app"
            value={relayUrl}
            onChange={e=>setRelayUrl(e.target.value)}
          />
        </div>
        {relayUrl && (
          <button
            onClick={async()=>{
              try {
                const res = await fetch("" + (relayUrl.replace(/\/$/,"")) + "/health");
                const d = await res.json();
                alert("✓ Relay connected!\n\n" + (JSON.stringify(d,null,2)) + "");
              } catch(e) {
                alert("✗ Could not reach relay:\n" + (e.message) + "");
              }
            }}
            style={{marginTop:10,padding:"8px 16px",background:"#1a2230",border:"none",borderRadius:4,color:"#fff",fontFamily:"'Share Tech Mono',monospace",fontSize:10,letterSpacing:1,cursor:"pointer"}}
          >Test Connection →</button>
        )}
      </div>

      {/* API Key */}
      <div style={{background:"#ffffff",border:"2px solid #d0d8e0",borderRadius:8,padding:20,marginBottom:16,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#1a2230",marginBottom:4,letterSpacing:1}}>Shopmonkey API Key</div>
        <div style={{fontSize:11,color:"#7a8a9a",marginBottom:16}}>
          Required for live mode. Create a restricted key in Shopmonkey → Settings → Integrations → API with <strong>Work Orders (read)</strong> and <strong>Line Items (write)</strong> permissions only.
        </div>
        <div className="fld">
          <label className="flbl">API Key</label>
          <input
            className="finput"
            type="password"
            placeholder="sm_live_xxxxxxxxxxxx"
            value={apiKey}
            onChange={e=>setApiKey(e.target.value)}
          />
        </div>
        {apiKey && (
          <div style={{marginTop:10,padding:"8px 12px",background:"#f0fff5",border:"1px solid #22aa55",borderRadius:4,fontSize:11,color:"#22aa55",fontWeight:600}}>
            ✓ API key saved - switch to Live Mode to activate
          </div>
        )}
      </div>

      {/* Demo RO reference */}
      {demoMode && (
        <div style={{background:"#ffffff",border:"2px solid #d0d8e0",borderRadius:8,padding:20,boxShadow:"0 1px 4px rgba(0,0,0,0.07)"}}>
          <div style={{fontSize:11,fontWeight:700,color:"#1a2230",marginBottom:14,letterSpacing:1}}>Demo RO Numbers</div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {Object.entries(DEMO_ROS).map(([ro,d])=>(
              <div key={ro} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 12px",background:"#f5f8fb",borderRadius:4,border:"1px solid #e0e8f0"}}>
                <span style={{fontFamily:"'Orbitron',sans-serif",fontSize:11,color:"#ff6b35",minWidth:80,fontWeight:700}}>{ro}</span>
                <span style={{fontSize:11,color:"#1a2230",flex:1}}>{d.vehicle}</span>
                <span style={{fontSize:9,color:"#7a8a9a",background:"#e0e8f0",padding:"2px 7px",borderRadius:3,fontWeight:600}}>{d.trans}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )}
</div>
```

);
}
