import { screen, render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { Async } from './Async';

describe('Async Test to Button', () => {
  it('renders correctly', async () => {
    render(
      <Async />
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
    //para ficar monitorando ate que o elemento apareça em tela use-se o find

    // expect(await screen.findByText('button')).toBeInTheDocument()

    //para fica esperando qualquer elemento em tela seja componenete ou não, use-se o wairfor

    await waitFor(() => {
      return expect(screen.queryByText('button')).toBeInTheDocument()
    })

    // para quando o elemento esta em tela e que ela deseaparece depois de um tempo, usa-se o waitForElementToBeRemove

    //   await waitForElementToBeRemoved(screen.queryByText('button'))
    // })

  })
})


