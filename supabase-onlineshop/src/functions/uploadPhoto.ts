import supabase from "../utils/supabase"

export async function uploadPhoto(file: File | null) {
  if (!file) return null

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    console.error("User wurde nicht gefunden")
    return null
  }

  const filePath = `${user.id}/${file.name}`

  const { error: storageError } = await supabase.storage
    .from("profiles-img")
    .upload(filePath, file, { cacheControl: "3600", upsert: false, contentType: file.type })

  if (storageError) {
    console.error("Fehler beim hochladen", storageError)
  }

  const { data: publicUrlImg } = supabase.storage.from("profiles-img").getPublicUrl(filePath)
  console.log("Bild ist erfolgreich hochgeladen", publicUrlImg.publicUrl)
  return publicUrlImg.publicUrl
}
