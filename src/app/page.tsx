import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

async function getRecipes() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate');

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return res.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  console.log(recipes);
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.meals.map((recipe: any) => (
          <Card key={recipe.idMeal} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage src={recipe.strMealThumb} alt="meal" />
                <AvatarFallback> {recipe.strMeal.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{recipe.strMeal}</CardTitle>
                <CardDescription>{recipe.strCategory}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.strInstructions.slice(0, 100)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>View Recipe</Button>
              {(recipe.strCategory = 'Dessert' && <Badge variant="secondary">Dessert</Badge>)}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
