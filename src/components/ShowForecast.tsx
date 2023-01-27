import { forecastType } from '../types'
type Props = {
	data: forecastType
}

const Degree = ({temp}:{temp: number}): JSX.Element => (
	<span>
		{temp}<sup>o</sup>C
	</span>
)

const getDate = (dt: number): JSX.Element => {
		const date: Date = new Date(dt*1000);
		const month = date.getMonth()+1;
		const day = date.getDate();
		const hours = date.getHours();
		const mins = date.getMinutes();
	return (
		<span>{`${day}/${month}`} {`${hours}hrs`}</span>
	)
}

const ShowForecast = ({data}: Props): JSX.Element => {
	const today = data.list[0];
  return (
	<div className='flex flex-col justify-center overflow-x-hidden w-full md:max-w-[500px] py-4 md:py-4 md:px-10 h-full md:max-h-[370px] bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg'>
		<main>
		<section className="text-center">
			<h2 className='text-2xl font-black'>{data.name}<span className='font-light'>{data.country}</span></h2>
			<h1 className='text-4xl font-extrabold'>
				<Degree temp={Math.round(today.main.temp)} />
			</h1>
			<p className='text-sm'>
				{today.weather[0].main}{' '}
				{today.weather[0].description}
			</p>
			<p className="text-sm">
				<span className='font-black'>H</span> : <Degree temp={Math.ceil(today.main.temp_max)}/>
				{' '}	
				<span className="font-black">L</span> : <Degree temp={Math.floor(today.main.temp_min)}/>
			</p>
		</section>
		<section className='flex scrollbar mx-5 overflow-x-scroll mt-4 pb-4 mb-5 scroll-smooth'>
			{
				data.list.map((item,i)=>(
					<div key={i} className='inline-block text-center w-50px flex-shrink-0'>
						<p>{i===0?'Now': getDate(item.dt)}</p>	
						<img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt={`weather-icon-${item.weather[0].description}`} />
						<p>
							<Degree temp={Math.round(item.main.temp)}/>
						</p>	
					</div>
				))
			}
		</section>
		</main>
	</div>
  )
}

export default ShowForecast