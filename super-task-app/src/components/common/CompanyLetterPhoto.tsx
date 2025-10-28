interface CompanyPhotoProps {
  name: string;
}


export function CompanyLetterPhoto({ name }: CompanyPhotoProps){
  const words = name.split(" "); 
  const firstLetters = words
    .slice(0, 2) 
    .map((word: string) => word[0]) 
    .join(""); 
  
  return (
    <div className="w-14 h-14 rounded-full bg-purple-variant flex items-center justify-center text-white font-semibold text-2xl">
      {firstLetters.toUpperCase()}
    </div>
  )

}