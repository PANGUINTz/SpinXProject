import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Canvas } from "@react-three/fiber";
import {useGLTF , Stage , PresentationControls } from "@react-three/drei";   


const ModelPage = () => {

  const [isActive, setIsActive] = useState(false)


  useEffect(() => {
     return(setIsActive(true))
  }, [isActive]);

  function Model(props){
    const{scene} =useGLTF(`${`/glasses3.2.glb`}`);
    return <primitive object={scene} {...props}/>
  }

  function Model2(props){
    const{scene} =useGLTF(`${`/glasses2.2.glb`}`);
    return <primitive object={scene} {...props}/>
  }

  function Model3(props){
    const{scene} =useGLTF(`${`/glasses.glb`}`);
    return <primitive object={scene} {...props}/>
  }


  return (
    <div className='w-[100%] h-screen bg-gray-300'>
      <Navbar isActive={isActive} dest="Model"/>
      <p className='p-5 text-center text-3xl'>โมเดลแว่น</p>
      <div className='w-[50%] border border-black m-auto h-[50%]'>

        <Canvas dpr={[1,2]}>
          <color attach="background" args={["#101010"]}/>
            {/* Controller Model */}
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1,Math.PI/4]}>

              {/* Color Model */}
              <Stage environment={null}>
                <Model position={[0, 0, 0]}/>
              </Stage>
            </PresentationControls>
        </Canvas>

        <div className='w-full h-[60%] flex justify-between'>
          <div className='mt-5 w-[45%] bg-black h-[100%]'>
          <Canvas dpr={[1,2]}>
          <color attach="background" args={["#101010"]}/>
            {/* Controller Model */}
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1,Math.PI/4]}>

              {/* Color Model */}
              <Stage environment={null}>
                <Model2 position={[0, 0, 0]}/>
              </Stage>
            </PresentationControls>
          </Canvas>
          </div>

          <div className='mt-5 w-[45%] bg-black h-[100%]'>
          <Canvas dpr={[1,2]}>
          <color attach="background" args={["#101010"]}/>
            {/* Controller Model */}
            <PresentationControls speed={1.5} global zoom={.5} polar={[-0.1,Math.PI/4]}>

              {/* Color Model */}
              <Stage environment={null}>
                <Model3 position={[0, 0, 0]}/>
              </Stage>
            </PresentationControls>
          </Canvas>
          </div>
        </div>
      </div>
    </div>
    

  )
}

export default ModelPage