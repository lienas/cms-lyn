// WARNING: This file was automatically generated by "no.item.xp.codegen". You may lose your changes if you edit it.
export type Book = import("./book").Book;
export type Character = import("./character").Character;

declare global {
  namespace XP {
    interface ContentTypes {
      "de.lyn.be:book": Book;
      "de.lyn.be:character": Character;
    }
  }
}
