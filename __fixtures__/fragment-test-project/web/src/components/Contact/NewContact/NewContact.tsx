import type {
  CreateContactMutation,
  CreateContactInput,
  CreateContactMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redmix/router'
import { useMutation } from '@redmix/web'
import type { TypedDocumentNode } from '@redmix/web'
import { toast } from '@redmix/web/toast'

import ContactForm from 'src/components/Contact/ContactForm'

const CREATE_CONTACT_MUTATION: TypedDocumentNode<
  CreateContactMutation,
  CreateContactMutationVariables
> = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const NewContact = () => {
  const [createContact, { loading, error }] = useMutation(
    CREATE_CONTACT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Contact created')
        navigate(routes.contacts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateContactInput) => {
    createContact({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Contact</h2>
      </header>
      <div className="rw-segment-main">
        <ContactForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewContact
