"use client";
import React from "react";
import MagnetLines from "@/src/blocks/Animations/MagnetLines/MagnetLines";
import Slider from "../components/uiverse/slider";
import ColorPicker from "../components/colorPicker/colorpicker";
import Select from "../components/uiverse/select";
import { BringToFront, Grid2x2, Ruler, Settings, Settings2 } from "lucide-react";
import { motion } from "framer-motion";
import "../globals.css"
function Page() {
  const [gridLev, setGridLev] = React.useState(false);

  const [template, setTemplate] = React.useState("Custom")

  React.useEffect(()=>{
      const index = templates.findIndex(item => item.name === template);
      setMagneticProps(templates[index].set);
    }, [template])
  
  const handleChange = (e)=>{setTemplate(e.target.value)} 

  React.useEffect(() => {
    setGridLev(false);
    setTimeout(() => {
      setGridLev(true);
    }, 10);
  }, [template]);

  const [magneticProps, setMagneticProps] = React.useState({
    gridSize: 15,
    containerHeight: "100vh",
    containerWidth: "100vw",
    lineColor: "#663399",
    lineWidth: 4,
    lineHeight: 30,
    baseAngle: -10,
    bgColor: "#0e0e0e",
    borderRadius: 45,
  });

  const [show, setShow] = React.useState(false)
    React.useEffect(()=>{
      setShow(true);
    }, [])
  return (
    
    <div className={`w-screen h-screen flex justify-between items-center`}>
      {show && (
        <>
      <div className={`w-[100vh]`}>
        {gridLev && (
          <MagnetLines
            bgColor={magneticProps.bgColor}
            rows={magneticProps.gridSize}
            columns={magneticProps.gridSize}
            containerHeight={magneticProps.containerHeight}
            containerWidth={magneticProps.containerWidth}
            lineColor={magneticProps.lineColor}
            lineWidth={magneticProps.lineWidth + "px"}
            lineHeight={magneticProps.lineHeight + "px"}
            baseAngle={magneticProps.baseAngle}
            borderRadius={magneticProps.borderRadius}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, translateX: "100px", scale: 0 }}
        animate={{ opacity: 1, translateX: "0px", scale: 1 }}
        transition={{
          duration: 0.2,
          type: "spring",
          damping: 60,
          mass: 5,
          stiffness: 300,
        }}
        layout
        className="settingsCont"
        style={{ position: "relative" }}
      >
        <div className="settingsTitle flex items-center justify-center flex-row gap-[15px]">
          <Settings size={30} />
          <p className="flex justify-center items-center">{`Settings`}</p>
        </div>
        <p className="templates">
          <Settings2 size={18} /> Templates
        </p>
        <Select
          templates={templates}
          template={template}
          handleChange={handleChange}
        />
        <div className="division"></div>
        <Slider
          icon={<Grid2x2 size={20} />}
          minimum={1}
          maximum={20}
          text={"Size"}
          value={magneticProps.gridSize}
          onChangeFn={(e) => {
            if (
              parseInt(e.target.value) > 0 &&
              parseInt(e.target.value) <= 20
            ) {
              setMagneticProps((prev) => {
                return { ...prev, gridSize: parseInt(e.target.value) };
              });
            }
            setGridLev(false);
            setTimeout(() => {
              setGridLev(true);
            }, 10);
          }}
        />
        <div className="division" />
        <div className="grid grid-cols-2 gap-[10px] w-full">
          <Slider
            text={"Height"}
            icon={<Ruler size={20} />}
            value={magneticProps.lineHeight}
            onChangeFn={(e) => {
              if (
                parseInt(e.target.value) > 0 &&
                parseInt(e.target.value) <= 100
              ) {
                setMagneticProps((prev) => {
                  return { ...prev, lineHeight: parseInt(e.target.value) };
                });
              }
            }}
          />
          <Slider
            icon={<Ruler size={20} />}
            text={"Width"}
            value={magneticProps.lineWidth}
            onChangeFn={(e) => {
              if (
                parseInt(e.target.value) > 0 &&
                parseInt(e.target.value) <= 100
              ) {
                setMagneticProps((prev) => {
                  return { ...prev, lineWidth: parseInt(e.target.value) };
                });
              }
            }}
          />
        </div>
        <Slider
          icon={<BringToFront size={20} />}
          minimum={0}
          maximum={100}
          text={"Border Radius"}
          value={magneticProps.borderRadius}
          onChangeFn={(e) => {
            if (
              parseInt(e.target.value) > 0 &&
              parseInt(e.target.value) <= 100
            ) {
              setMagneticProps((prev) => {
                return { ...prev, borderRadius: parseInt(e.target.value) };
              });
            }
          }}
        />
        <div className="division" />
        <div className="grid w-full gap-[10px] grid-cols-2">
          <ColorPicker
            label="Color"
            value={magneticProps.lineColor}
            onChangeFn={(e) => {
              setMagneticProps((prev) => {
                return { ...prev, lineColor: e.target.value };
              });
            }}
          />
          <ColorPicker
            label="BG Color"
            value={magneticProps.bgColor}
            onChangeFn={(e) => {
              setMagneticProps((prev) => {
                return { ...prev, bgColor: e.target.value };
              });
            }}
          />
        </div>
        <div className="division"></div>
        <p>Reload if FPS issues.</p>
      </motion.div>
        </>
      )}
    </div>
  );
}

export default Page;


const templates = [
  {
    name: "Custom",
    set: {
      gridSize: 15,
      containerHeight: "100vh",
      containerWidth: "100vw",
      lineColor: "#663399",
      lineWidth: 4,
      lineHeight: 30,
      baseAngle: -10,
      bgColor: "#0e0e0e",
      borderRadius: 45,
    },
  },
  {
    name: "Candy",
    set: {
      gridSize: 15,
      containerHeight: "100vh",
      containerWidth: "100vw",
      lineColor: "#993391",
      lineWidth: 20,
      lineHeight: 36,
      baseAngle: -10,
      bgColor: "#100910",
      borderRadius: 45,
    },
  },
  {
    name: "Sun",
    set: {
      gridSize: 15,
      containerHeight: "100vh",
      containerWidth: "100vw",
      lineColor: "#fff047",
      lineWidth: 1,
      lineHeight: 80,
      baseAngle: -10,
      bgColor: "#001a4d",
      borderRadius: 45,
    },
  },
  {
    name: "Aim",
    set: {
      gridSize: 20,
      containerHeight: "100vh",
      containerWidth: "100vw",
      lineColor: "#ff0000",
      lineWidth: 100,
      lineHeight: 1,
      baseAngle: -10,
      bgColor: "#000000",
      borderRadius: 45,
    },
  },
];
