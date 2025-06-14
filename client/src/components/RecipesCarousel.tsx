import { useState } from 'react';
import { Clock, ChefHat, ArrowRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RecipeModal } from './RecipeModal';

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  difficulty: 'Fácil' | 'Media' | 'Difícil';
  ingredients?: string[];
  instructions?: string[];
}

export function RecipesCarousel() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Datos de las recetas en español con imágenes de Unsplash
  const recipes: Recipe[] = [
    {
      id: 1,
      title: 'Pan de Campaña Italiano',
      description: 'Un clásico pan rústico con corteza crujiente y miga esponjosa, perfecto para acompañar cualquier comida.',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      prepTime: '3 horas',
      difficulty: 'Media',
      ingredients: [
        '500g de harina de fuerza',
        '350ml de agua tibia',
        '10g de sal',
        '1g de levadura seca',
        'Harina de arroz para espolvorear'
      ],
      instructions: [
        'Mezclar la harina, agua, sal y levadura hasta obtener una masa pegajosa.',
        'Dejar reposar 30 minutos y hacer pliegues cada 30 minutos durante 2 horas.',
        'Formar el pan y dejar levar 1 hora más.',
        'Hornear a 250°C durante 30-35 minutos con vapor.'
      ]
    },
    {
      id: 2,
      title: 'Focaccia Genovesa',
      description: 'La famosa focaccia italiana con aceite de oliva y romero, esponjosa por dentro y crujiente por fuera.',
      image: 'https://plus.unsplash.com/premium_photo-1700326967545-91adcec6af2a?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      prepTime: '2.5 horas',
      difficulty: 'Fácil',
      ingredients: [
        '500g de harina 000',
        '350ml de agua tibia',
        '50ml de aceite de oliva virgen extra',
        '10g de sal',
        '1 cucharadita de azúcar',
        '7g de levadura seca',
        'Romero fresco y sal gruesa para decorar'
      ],
      instructions: [
        'Disolver la levadura y el azúcar en agua tibia. Dejar reposar 10 minutos.',
        'Mezclar la harina con la sal, hacer un volcán y agregar el agua con levadura y el aceite.',
        'Amasar hasta obtener una masa elástica. Dejar levar 1 hora o hasta doblar su volumen.',
        'Estirar en una bandeja de horno, hacer hoyos con los dedos y dejar levar 30 minutos más.',
        'Regar con aceite de oliva, espolvorear romero y sal gruesa. Hornear a 200°C por 20-25 minutos.'
      ]
    },
    {
      id: 3,
      title: 'Ciabatta Casera',
      description: 'El pan italiano por excelencia, con su miga alveolada y corteza crujiente, ideal para sándwiches.',
      image: 'https://images.unsplash.com/photo-1653550027228-e3202a24ccc1?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      prepTime: '4 horas',
      difficulty: 'Media',
      ingredients: [
        '500g de harina de fuerza',
        '400ml de agua tibia',
        '10g de sal',
        '2g de levadura seca',
        '1 cucharadita de azúcar',
        'Harina de arroz para espolvorear',
        'Aceite de oliva virgen extra'
      ],
      instructions: [
        'En un bol grande, disolver la levadura y el azúcar en 100ml de agua tibia. Dejar reposar 10 minutos hasta que espume.',
        'Agregar el resto del agua y la mitad de la harina. Mezclar hasta obtener una masa pegajosa. Cubrir y dejar reposar 30 minutos.',
        'Agregar la sal y el resto de la harina poco a poco, mezclando bien con una espátula o las manos humedecidas.',
        'Cubrir el bol con papel film y dejar reposar 1 hora en un lugar cálido. Hacer pliegues cada 20 minutos (estirar y doblar la masa sobre sí misma).',
        'Espolvorear generosamente harina sobre la mesa de trabajo y volcar la masa. Dividirla en 2-3 porciones con una espátula o cuchillo.',
        'Con las manos enharinadas, formar los panes alargados sin desgasificar demasiado la masa. Colocarlos en un paño de lino enharinado.',
        'Dejar levar 1 hora más, cubiertos con un paño húmedo.',
        'Precalentar el horno a 250°C (480°F) con una bandeja en la parte inferior. Colocar los panes en una bandeja para hornear con papel de hornear.',
        'Hacer cortes superficiales con un cuchillo afilado en la superficie de los panes.',
        'Hornear durante 10 minutos con vapor (verter una taza de agua en la bandeja caliente del horno al inicio).',
        'Bajar la temperatura a 220°C (430°F) y hornear 15-20 minutos más hasta que estén dorados.',
        'Dejar enfriar completamente sobre una rejilla antes de cortar.'
      ]
    },
    {
      id: 4,
      title: 'Grissini Tradicionales',
      description: 'Bastones de pan crujientes, perfectos como aperitivo o acompañamiento de quesos y embutidos.',
      image: 'https://plus.unsplash.com/premium_photo-1670845441220-e8289f9c3228?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      prepTime: '1.5 horas',
      difficulty: 'Fácil',
      ingredients: [
        '500g de harina 000',
        '250ml de agua tibia',
        '100ml de vino blanco seco',
        '100ml de aceite de oliva virgen extra',
        '10g de sal',
        '15g de azúcar',
        '15g de levadura fresca',
        'Semillas de sésamo o ajo en polvo para decorar (opcional)'
      ],
      instructions: [
        'Disolver la levadura en el agua tibia con el azúcar. Dejar reposar 10 minutos.',
        'En un bol grande, mezclar la harina con la sal. Hacer un hueco en el centro y verter el agua con levadura, el vino y el aceite.',
        'Amasar hasta obtener una masa suave y elástica. Si es necesario, añadir un poco más de harina.',
        'Dejar reposar la masa tapada con un paño en un lugar cálido hasta que doble su volumen (unos 45 minutos).',
        'Precalentar el horno a 180°C (350°F).',
        'Dividir la masa en porciones y formar bastones delgados de unos 20 cm de largo.',
        'Hervir agua en una olla ancha y cocinar los grissini en lotes durante 1 minuto por lado. Escurrir sobre papel absorbente.',
        'Colocar los grissini en una bandeja para horno forrada con papel manteca, pincelar con aceite de oliva y espolvorear con sal gruesa y las semillas o ajo en polvo si se desea.',
        'Hornear durante 25-30 minutos o hasta que estén dorados y crujientes. Dejar enfriar sobre una rejilla.'
      ]
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dotsClass: 'slick-dots !mt-8',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="pt-20 pb-16 px-4 bg-amber-50">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-800 mb-8 text-center">
          Recetas Italianas
        </h2>
        <Slider {...settings}>
          {recipes.map((recipe) => (
            <div key={recipe.id} className="px-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col mb-8" style={{ minHeight: '380px' }}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-medium text-lg text-amber-900 mb-2">{recipe.title}</h3>
                  <p className="text-amber-700 text-sm mb-4 flex-grow">{recipe.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center text-amber-600 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {recipe.prepTime}
                    </span>
                    <span className="flex items-center text-amber-600 text-sm">
                      <ChefHat className="w-4 h-4 mr-1" />
                      {recipe.difficulty}
                    </span>
                    <button 
                      className="text-amber-700 hover:text-amber-900 text-sm font-medium flex items-center"
                      onClick={() => setSelectedRecipe(recipe)}
                    >
                      Ver receta <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        
        {selectedRecipe && (
          <RecipeModal 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default RecipesCarousel;
