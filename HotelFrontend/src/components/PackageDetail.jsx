import Showcase from "./Showcase";
import { HotelRoomDetail } from "../Detail/HotelDetail";
import WrapperContainer from "./WrapperContainer";
import 'animate.css';


const PackageDetail = () => {
  return (
    <div className="bg-[#0b8185]">
    <WrapperContainer> 
      <div className="flex flex-col md:flex-row items-center p-4 py-12 text-[#fcf2de]">
        <div className="w-1/2">
          <span>Paquetes</span>
          <h3 className="text-4xl">Date un capricho</h3>
        </div>
        <div className="w-1/2">
        </div>
      </div>
      <div
        id="showcase-Section"
        className="container m-auto flex flex-wrap flex-col md:flex-row justify-between items-center"
      >
        {HotelRoomDetail.map((detail) => (
          <Showcase
            key={detail.id}
            img={detail.images}
            title={detail.name}
            desc={detail.description}
            id={detail.id}
          />
        ))}
      </div>
      </WrapperContainer> 

      <div className="bg-[#F9E5BD] py-24 sm:py-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl lg:mx-0">
      <h2 className="text-3xl font-bold tracking-tight text-black-900 sm:text-4xl">Testimonios</h2>
      <h2 className="text-3xl font-bold tracking-tight text-black-900 sm:text-4xl">Calificación de nuestros clientes!</h2>
    </div>
    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-black-500">Mar 16, 2020</time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-black-900 group-hover:text-black-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              Excelente experiencia
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-black-600">Me encantó mi estadía en este hotel. Las habitaciones eran espaciosas y limpias, el personal era amable y servicial, y la ubicación era perfecta para explorar la selva amazónica..</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-black-50"/>
          <div className="text-sm leading-6">
            <p className="font-semibold text-black-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
          </div>
        </div>
      </article>
      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-black-500">Mar 16, 2020</time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-black-900 group-hover:text-black-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              Una experiencia inolvidable
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-black-600">Este hotel me ofreció una experiencia inolvidable en la selva amazónica. El personal fue muy amable y servicial, las habitaciones eran cómodas y limpias, y las actividades que ofrecían fueron muy divertidas.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-black-50"/>
          <div className="text-sm leading-6">
            <p className="font-semibold text-black-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
          </div>
        </div>
      </article>
      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-black-500">Mar 16, 2020</time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-black-900 group-hover:text-black-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              Un lugar para relajarse y disfrutar
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-black-600">Este hotel es un lugar perfecto para relajarse y disfrutar de la naturaleza. Las habitaciones son cómodas y el personal es muy amable. Las actividades que ofrecen son una excelente manera de explorar la selva amazónica.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-black-50"/>
          <div className="text-sm leading-6">
            <p className="font-semibold text-black-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
          </div>
        </div>
      </article>
      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-black-500">Mar 16, 2020</time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-black-900 group-hover:text-black-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              Una excelente opción para familias
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-black-600">Este hotel es una excelente opción para familias con niños. Las habitaciones son amplias y cómodas, y el personal está dispuesto a ayudar con cualquier necesidad. Las actividades que ofrecen son una excelente manera de que los niños aprendan sobre la selva amazónica.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-black-50"/>
          <div className="text-sm leading-6">
            <p className="font-semibold text-black-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
          </div>
        </div>
      </article>

      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-black-500">Mar 16, 2020</time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-black-900 group-hover:text-black-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              Un lugar para volver
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-black-600">Me encantó mi estadía en este hotel y definitivamente volvería. El personal fue excelente, las habitaciones eran cómodas y las actividades que ofrecían fueron muy divertidas.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-black-50"/>
          <div className="text-sm leading-6">
            <p className="font-semibold text-black-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
          </div>
        </div>
      </article>

      <article className="flex max-w-xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime="2020-03-16" className="text-black-500">Mar 16, 2020</time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-black-900 group-hover:text-black-600">
            <a href="#">
              <span className="absolute inset-0"></span>
              Una experiencia que vale la pena
            </a>
          </h3>
          <p className="mt-5 line-clamp-3 text-sm leading-6 text-black-600">Este hotel ofrece una experiencia que vale la pena. El personal es amable, las habitaciones son cómodas y las actividades son divertidas. Es un lugar perfecto para relajarse y disfrutar de la selva amazónica.</p>
        </div>
        <div className="relative mt-8 flex items-center gap-x-4">
          <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-10 w-10 rounded-full bg-black-50"/>
          <div className="text-sm leading-6">
            <p className="font-semibold text-black-900">
              <a href="#">
                <span className="absolute inset-0"></span>
                Michael Foster
              </a>
            </p>
          </div>
        </div>
      </article>
      

          </div>
        </div>
    </div>
    </div>
  );
};

export default PackageDetail;
