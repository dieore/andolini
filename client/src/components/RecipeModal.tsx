import { X, Clock, ChefHat, Utensils, BookOpen, ArrowRight } from 'lucide-react';

interface RecipeModalProps {
  recipe: {
    id: number;
    title: string;
    description: string;
    image: string;
    prepTime: string;
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    ingredients?: string[];
    instructions?: string[];
  } | null;
  onClose: () => void;
}

export function RecipeModal({ recipe, onClose }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6 text-amber-800" />
          </button>
          
          <div className="h-64 md:h-80 overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-900 mb-2">{recipe.title}</h2>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-amber-700">
                <Clock className="w-5 h-5 mr-1" />
                {recipe.prepTime}
              </span>
              <span className="flex items-center text-amber-700">
                <ChefHat className="w-5 h-5 mr-1" />
                {recipe.difficulty}
              </span>
            </div>
          </div>
          
          <p className="text-amber-800 mb-6">{recipe.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="flex items-center text-xl font-semibold text-amber-900 mb-4">
                <Utensils className="w-5 h-5 mr-2" />
                Ingredientes
              </h3>
              <ul className="space-y-2">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-amber-600 mr-2">•</span>
                    <span className="text-amber-800">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="flex items-center text-xl font-semibold text-amber-900 mb-4">
                <BookOpen className="w-5 h-5 mr-2" />
                Preparación
              </h3>
              <ol className="space-y-3">
                {recipe.instructions?.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-amber-700 mr-2">{index + 1}.</span>
                    <span className="text-amber-800">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
