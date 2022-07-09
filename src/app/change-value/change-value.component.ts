import {
  IncrementValue,
  DecrementValue,
  ResetValue,
  SetValue,
} from './../state/simple-value.actions';
import { SimpleValueState } from './../state/simple-value.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-change-value',
  templateUrl: './change-value.component.html',
  styleUrls: ['./change-value.component.scss'],
})
export class ChangeValueComponent implements OnInit, OnDestroy {
  @Select(SimpleValueState.getValue) value$!: Observable<number>;
  value!: number;

  valueSubscription!: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.valueSubscription = this.value$.subscribe(
      (value: number) => (this.value = value)
    );
  }

  increment(): void {
    this.store.dispatch(new IncrementValue());
  }

  decrement(): void {
    this.store.dispatch(new DecrementValue());
  }

  reset(): void {
    this.store.dispatch(new ResetValue());
  }

  setValue(val: number | null): void {
    if (val) {
      this.store.dispatch(new SetValue(val));
    } else {
      this.store.dispatch(new ResetValue());
    }
  }

  ngOnDestroy(): void {
    if (this.valueSubscription) this.valueSubscription.unsubscribe();
  }
}
