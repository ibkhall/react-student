import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex w-full h-screen">
      <div className="h-full w-full md:w-1/2 flex flex-col justify-center items-center gap-y-4">
        <Image width={85} height={85} src="/armoirie.png" alt="Armoirie du Niger" />
        <h1 className="text-2xl text-center w-full max-w-sm font-medium">
          Connectez-vous au Portail du Guichet Unique du Commerce Extérieur du Niger
        </h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Nom Utilisateur</Label>
          <Input name="email" type="email" id="email" placeholder="Email" />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Mot de Passe</Label>
          <Input className="focus:border-[#ec9a54] focus:outline-0 focus:ring-0" name="password" type="password" id="password" placeholder="Email" />
        </div>
        <div className="flex justify-end w-full max-w-sm">
          <Button variant="link" className="underline">Mot de passe oublié ?</Button>

        </div>
        <Button className="w-full max-w-sm bg-[#ec9a54] hover:bg-[#ec9a54]/80 transition-all">Connexion</Button>
        </div>
      <div className="h-full hidden md:flex w-1/2 bg-[url('/login-bg.webp')] bg-center bg-cover bg-no-repeat justify-center items-center">
        <Image  width={85} height={85} src="/armoirie.png" alt="Armoirie du Niger"/>
      </div>
    </div>
  );
}
