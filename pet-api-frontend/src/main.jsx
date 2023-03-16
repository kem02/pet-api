import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Login from './components/Login'
import { fetchLogin, fetchAllPets, fetchSearchedPet } from './api'
import { ChakraProvider } from '@chakra-ui/react'
import MainPage from './components/MainPage'
import PetSearch from './components/PetSearch'
import PetSearchResult from './components/PetSearchResult'
import ProtectedRoute from './components/protected'
import AllPetsPage from './components/AllPetsPage'
import Index from './components/Index'
import ErrorPage from './components/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "pet",
        element: <AllPetsPage />,
        loader: async () => {
          return await fetchAllPets();
        },
      },
      {
        path: "pet/user",
        element: (
          <ProtectedRoute>
            <PetSearch />
          </ProtectedRoute>
        ),
        children: [
          {
            path: ":petId",
            element:
              <ProtectedRoute>
                <PetSearchResult />
              </ProtectedRoute>,
            loader: async ({ params }) => {
              try {
                console.log(params.petId)
                const petId = params.petId;
                return await fetchSearchedPet(petId)
              } catch (error) {
                // console.log(error)
                return error;
              }

            }
          },
        ]

      },

      
    ]
  },
  {
    path: "/auth/login",
    element: <Login />,
    action: async ({ request }) => {

      try {
        console.log(request)
        let formData = await request.formData()
        // console.log(formData);
        const username = formData.get("username");
        const password = formData.get("password");
        // console.log(username, password);
        return await fetchLogin(username, password)
      } catch (error) {
        console.log(error)
        return error;
      }

    },
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)
