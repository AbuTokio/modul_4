import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router"
import { mainContext } from "../../context/MainProvider"
import type { User } from "../../interfaces/User"
import supabase from "../../utils/supabase"

interface ProfileProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export default function Profile() {
  const { user, setUser } = useContext(mainContext) as ProfileProps

  const [isEditing, setIsEditing] = useState(false)
  const [newUsername, setNewUserName] = useState("")

  const fetchData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    // console.log(user)

    if (user) {
      const { data: customer, error } = await supabase.from("customers").select("*").eq("id", user.id)
      if (error) console.error("Fehler beim Laden des Users:", error)
      else setUser(customer?.[0] || null)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleSave() {
    if (user && newUsername !== user.username) {
      const { error } = await supabase.from("customers").update({ username: newUsername }).eq("id", user.id)
      if (error) console.error("Fehler beim Aktualisieren des Benutzernamens:", error)
      else fetchData()
    }
    setIsEditing(false)
  }

  function handleDoubleClick() {
    if (user) {
      setIsEditing(true)
      setNewUserName(user.username)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
      {user ? (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">Your Profile</h2>

          <div onDoubleClick={handleDoubleClick} className="cursor-pointer p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Username</p>
            {isEditing ? (
              <input
                type="text"
                placeholder="Change your username"
                value={newUsername}
                onChange={(e) => setNewUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-lg font-medium text-gray-800 dark:text-gray-100">{user.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-gray-700 dark:text-gray-300">
              Firstname: <span className="font-medium">{user.firstname}</span>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Lastname: <span className="font-medium">{user.lastname}</span>
            </p>
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              Save
            </button>
          )}

          <Link
            to="/"
            className="block text-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-4">
            Back to Home
          </Link>
        </div>
      ) : (
        <p className="text-center text-gray-700 dark:text-gray-300">Profile is loading...</p>
      )}
    </div>
  )
}
