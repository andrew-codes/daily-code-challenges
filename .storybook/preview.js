import { addParameters } from '@storybook/react';

addParameters({
    options: {
        storySort: (a, b) =>
            a[1].kind === b[1].kind ? 0 : b[1].id.localeCompare(a[1].id, undefined, { numeric: true }),
    },
});
